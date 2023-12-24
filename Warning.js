document.getElementById('Safe').addEventListener('click', function() {
    chrome.tabs.update({url: 'https://1.1.1.1'});
});

document.getElementById('Correct').addEventListener('click', function() {
    chrome.tabs.update({url: 'https://www.google.com'});
});

document.getElementById('Continue').addEventListener('click', function() {
    chrome.runtime.sendMessage({method: "getOriginalUrl"}, function(response) {
        chrome.tabs.update({url: response.url});
    });
});