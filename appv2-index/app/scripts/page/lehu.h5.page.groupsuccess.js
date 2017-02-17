define('lehu.h5.page.groupsuccess', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'lehu.h5.component.groupsuccess'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
        LHFooter, LHDownload,
        LHGroupsuccess) {
        'use strict';

        Fastclick.attach(document.body);

        var Groupsuccess = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var login = new LHGroupsuccess("#content");
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

        new Groupsuccess('#content');
    });