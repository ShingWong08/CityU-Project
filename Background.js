let SpecificWebsites = ["https://g00gle.com/", "https://www.g00gle.com/"];
let originalUrl = null; // Store the original URL
let userContinued = false; // Flag to indicate whether the user has chosen to continue

function isSpecificWebsite(url) {
    return SpecificWebsites.includes(url);
}

function warningPage(tabId) {
    chrome.tabs.update(tabId, {url: "Warning.html"});
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && isSpecificWebsite(changeInfo.url) && !userContinued) {
        originalUrl = changeInfo.url; // Store the original URL before redirecting
        warningPage(tabId);
    } else {
        userContinued = false; // Reset the flag when navigating to a different website
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "getOriginalUrl") {
        userContinued = true; // Set the flag when the user chooses to continue
        sendResponse({url: originalUrl});
    }
});