(function (model, undefined) {
    'use strict';
    //Model module
    var tabs = [];

    // chrome api hook
    model.queryTabs = function queryTabs() {
        chrome.tabs.query({}, function (tabs) {
            model.set(tabs);
            model.getHTML();
        });
    };

    // filter predicate
    function isMatched(item) {
        return item.matches.length > 0;
    }

    // run lcs for every item
    function find_matches(sub) {
        tabs.forEach(function (i) {
            var text = i.title + i.url;
            i.matches = lcs.fuzzy(sub, text);
        });
    }

    // filters model based on matches found
    function filter_model(sub) {
        find_matches(sub);
        return tabs.filter(isMatched);
    }

    // setter
    model.set = function (m) {
        tabs = m;
    };

    // getter but also filters if sub is provided
    model.getHTML = function (sub) {
        if (sub !== undefined && sub.length > 0) {
            return ui.render(filter_model(sub), true);
        }
        return ui.render(tabs);
    };



}(window.model = window.model || {}));