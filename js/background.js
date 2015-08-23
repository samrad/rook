model.queryTabs();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        "use strict";

        if (request.action === "get_html") {
            sendResponse({result: model.getHTML(request.term)});
        }
    }
);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log('tabs updated');
    model.queryTabs();
});

chrome.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {
    console.log('tab created');
    model.queryTabs();
});




