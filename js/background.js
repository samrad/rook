db.getTabs();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        "use strict";

        if (request.action === "init") {
            sendResponse({tabs: db.get()});
            //chrome.tabs.query({}, function (tabs) {
            //    db.set(tabs);
            //    sendResponse({tabs: db.get()});
            //});


            //// Handle initial load
            //if (request.action === "get_tabs") {
            //    console.log('got get_tabs in background');
            //    var t_promise = getTabs();
            //    t_promise.then(function(result) {
            //        console.log('t resolved');
            //        sendResponse({fuck: result});
            //    });

            // Handle search
        } else if (request.action === "search") {
            sendResponse({tabs: db.get(request.term)});
        }
        return true;
    }
);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    db.getTabs();
});

chrome.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {
    db.getTabs();
});



