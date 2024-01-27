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

const searchParams = new URLSearchParams(window.location.search);

document.getElementById('Safe').addEventListener('click', function() {
    window.location.assign('https://1.1.1.1');
});

document.getElementById('Correct').addEventListener('click', function() {
    const hostname = searchParams.get('leg');
    console.log(`Going to ${hostname}`);
    window.location.assign(hostname);
});

document.getElementById('Continue').addEventListener('click', function() {
    const request = {
        method: "P04SetTrust",
        hostname: searchParams.get('host'),
    }
    API.runtime.sendMessage(request, function(response) {
        const hostname = searchParams.get('orig');
        console.log(`Going to ${hostname}`);
        window.location.assign(hostname);
    });
});

console.log("Warning script loaded");