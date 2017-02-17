define('lehu.h5.page.404', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid) {
        'use strict';

        Fastclick.attach(document.body);

        var Error404 = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {

            },

            '.n01 click': function(element, event) {
                var jsonParams = {
                    'funName': 'reload_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
                console.log(search_fun);
            },

            '.n02 click': function(element, event) {
                var jsonParams = {
                    'funName': 'back_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
                console.log('back_fun');
            }
        });

        new Error404('#404');
    });