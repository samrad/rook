(function (db, undefined) {
    'use strict';
    //Model module
    var model = [];

    db.getTabs = function getTabs() {
        chrome.tabs.query({}, function (tabs) {
            db.set(tabs);
        });
    };

    function isMatched(item) {
        return item.matches.length > 0;
    }

    function find_matches(sub) {
        model.forEach(function (i) {
            var text = i.title + i.url;
            i.matches = lcs.fuzzy(sub, text);
        });
    }

    function filter_model(sub) {
        find_matches(sub);
        return model.filter(isMatched);
    }

    db.set = function (m) {
        model = m;
    };

    db.get = function (sub) {
        //reload();
        if (sub !== undefined && sub.length > 0) {
            return filter_model(sub);
        }
        return model;
    };

}(window.db = window.db || {}));