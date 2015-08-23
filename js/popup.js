(function (ui, undefined) {
    'use strict';

    // UI Module
    //Private Property
    //var isHot = document.querySelector('#result');

    //Public Property
    ui.ingredient = 'Bacon Strips';

    //Public Method
    //ui.createRow = function () {
    //    var oliveOil;
    //
    //    addItem('tn Butter nt');
    //    addItem(oliveOil);
    //    console.log('Frying ' + skillet.ingredient);
    //};

    function _highlight(item) {

        if (item.matches === undefined || item.matches.length < 1) return;

        var text_length = item.title.length + item.url.length;
        var title = "";
        var url = "";
        for (var i = 0; i < text_length; i++) {

            // in title
            if (i < item.title.length) {
                if (item.matches.indexOf(i) > -1) {
                    title += '<span class="highlight">' + item.title[i] + '</span>';
                } else {
                    title += item.title[i];
                }
                // in url
            } else {
                if (item.matches.indexOf(i) > -1) {
                    url += '<span class="highlight">' + item.url[i - item.title.length] + '</span>';
                } else {
                    url += item.url[i - item.title.length];
                }
            }
        }

        item.title = title;
        item.url = url;
    }

    //Private Method
    function _createBody(items) {
        var result_body = document.createElement('tbody');
        items.forEach(function (item, index) {

            _highlight(item);

            // create table row
            var _tr = document.createElement('tr');

            // create icon
            var _tdIcon = document.createElement('td');
            _tdIcon.className = 'result-icon-wrap';

            var _img = document.createElement('img');
            _img.className = 'result-icon';
            _img.src = item.favIconUrl;

            _tdIcon.appendChild(_img);

            // create text
            var _tdText = document.createElement('td');
            var _title = document.createElement('div');
            _title.className = 'result-title';
            _title.innerHTML = item.title;

            var _url = document.createElement('div');
            _url.className = 'result-url';
            _url.innerHTML = item.url;

            _tdText.appendChild(_title);
            _tdText.appendChild(_url);

            // append both td to row
            _tr.appendChild(_tdIcon);
            _tr.appendChild(_tdText);

            // append row to body
            result_body.appendChild(_tr);

        });
        return result_body;
    }

    ui.render = function (items) {
        var result_table = document.querySelector('#result');
        result_table.innerHTML = '';
        result_table.appendChild(_createBody(items));
    };

}(window.ui = window.ui || {}));

//
//function print_url(tabs) {
//    "use strict";
//    tabs.forEach(function (tab) {
//        console.log(tab.url);
//    });
//}


chrome.runtime.sendMessage({greeting: "hello"}, function (response) {
    "use strict";
    console.log(response.farewell);
});

document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    console.log('popup loaded');

    var search_input = document.querySelector('#search');
    search_input.addEventListener('input', function () {
        chrome.runtime.sendMessage({action: "search", term: this.value}, function (response) {
            ui.render(response.tabs);
        });
    });

    chrome.runtime.sendMessage({action: "init"}, function (response) {
            console.log(response.tabs);
            ui.render(response.tabs);
        }
    );
});

