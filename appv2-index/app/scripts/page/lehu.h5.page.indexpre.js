define('lehu.h5.page.indexpre', [
        'lehu.h5.framework.global'
    ],

    function(global) {
        'use strict';

        if (localStorage.html01) {
            document.getElementById('ajax_banner').innerHTML = (localStorage.html01.replace(/data-original/g, "src"));
        }

        if (localStorage.html02) {
            document.getElementById('ajax_fastList').innerHTML = localStorage.html02.replace(/data-original/g, "src");
        }

        if (localStorage.html03) {
            document.getElementById('ajax_hotRecommendation').innerHTML = localStorage.html03.replace(/data-original/g, "src");
        }
    });