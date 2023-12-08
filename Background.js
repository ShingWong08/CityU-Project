let SpecificWebsites = ["https://google.com/", "https://www.google.com/"];

function isSpecificWebsite(url) {
    return SpecificWebsites.includes(url);
}

function injectScript(tabId) {
    console.log(`Injecting script into tab Id: ${tabId}`);
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            files: ['Inject.js'],
        }
    );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && isSpecificWebsite(changeInfo.url)) {
        injectScript(tabId);
    }
});
