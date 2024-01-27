// Detect browser platform for cross-browser compactibility
let API;
let platform;

if (typeof chrome !== 'undefined') {
    API = chrome;
    platform = "chrome";
} else if (typeof browser != 'undefined') {
    API = browser;
    platform = "firefox"
} else {
    throw new Error("Unsupported browser.")
}

// Scam -> Legitimate
let SpecificWebsites = {
    "g00gle.com": "google.com",
};

// Whether a "scam" website is allowed to visit
// This does not survive restarts
let trustedScams = [];

function isSpecificWebsite(url) {
    return SpecificWebsites.hasOwnProperty(url);
}

function getURL(original_hostname, original_url, legitimate_url) {
    const baseURL = API.runtime.getURL('Warning.html');
    const parameters = new URLSearchParams({
        host: original_hostname,
        orig: original_url,
        leg: legitimate_url
    });

    return `${baseURL}?${parameters.toString()}`;
}

API.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (typeof changeInfo.url != 'string') {
        return;
    }
    const old_URL = new URL(changeInfo.url);
    const hostname = old_URL.hostname;
    if (isSpecificWebsite(hostname) && !trustedScams.includes(hostname)) {
        let legitimate_url_obj = new URL(old_URL);
        legitimate_url_obj.hostname = SpecificWebsites[hostname];
        const legitimate_url = legitimate_url_obj.toString();

        const warning_url = getURL(hostname, changeInfo.url, legitimate_url);
        API.tabs.update(tabId, {url: warning_url});
    }
});

API.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "P04SetTrust") {
        if (!trustedScams.includes(request.hostname)) {
            trustedScams.push(request.hostname);
        }
        sendResponse({});
    }
});