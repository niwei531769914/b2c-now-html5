define('lehu.h5.page.groupdetail', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'lehu.h5.component.groupdetail'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
        LHFooter, LHDownload,
        LHGroupdetail) {
        'use strict';

        Fastclick.attach(document.body);

        var Group = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var group = new LHGroupdetail("#content");
                new LHFooter();

                var param = can.deparam(window.location.search.substr(1));
                if (!param.version) {
                    new LHDownload(null, {
                        'position': 'bottom',
                        'title': '下载app，拼团更优惠!',
                        'subtitle': '汇银乐虎全球家',
                        'canotclose': true
                    });
                }
            }
        });

        new Group('#content');
    });