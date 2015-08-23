document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    console.log('popup loaded');

    var search_input = document.querySelector('#search');
    search_input.addEventListener('input', function () {
        chrome.runtime.sendMessage({
                action: "get_html",
                term: this.value
            },
            function (response) {
            var result_table  = document.querySelector('#result');
            result_table.innerHTML = response.result;
        });
    });

    chrome.runtime.sendMessage({
            action: "get_html"
        },
        function (response) {
            var result_table  = document.querySelector('#result');
            result_table.innerHTML = response.result;
        }
    );
});

