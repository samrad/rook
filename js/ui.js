
(function (ui, undefined) {
    'use strict';

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

        item.highlighted_title = title;
        item.highlighted_url = url;
    }

    //Private Method
    function _createBody(items, highlighted) {
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
            _title.innerHTML = highlighted ? item.highlighted_title: item.title;

            var _url = document.createElement('div');
            _url.className = 'result-url';
            _url.innerHTML = highlighted ? item.highlighted_url : item.url;

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

    // renders a set of items
    ui.render = function (items, highlighted) {
        return _createBody(items, highlighted).innerHTML;
    };

}(window.ui = window.ui || {}));