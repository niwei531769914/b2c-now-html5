define('lehu.h5.page.activity0101', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.header.footer',
        'lehu.h5.header.download',
        'lehu.h5.component.activity0101'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHFooter, LHDownload,LHActivity0101) {
        'use strict';

        Fastclick.attach(document.body);

        var List = can.Control.extend({
             /*
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var activity0101 = new LHActivity0101("#content");
                new LHFooter();

                // var param = can.deparam(window.location.search.substr(1));

                // if (!param.version) {
                //     new LHDownload();
                // }
            }
        });

        new List('#content');
    });