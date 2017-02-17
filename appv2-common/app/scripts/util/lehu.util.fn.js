'use strict';

define('lehu.util', [
  'zepto',
  'can',
  'underscore',
  'md5',
  'store',
  'lehu.h5.business.config'
], function($, can, _, md5, store, config) {

  //$(window).hashchange();
  can.route.ready();

  // window.getShareIcon = function() {
  //   var src = $('#icon').attr('data-src');
  //   return src || 'false';
  // }

  // @note 请求存在跨域问题，需要外部支持
  window.onerror = function(msg, url, line) {
    // var params = $.param({
    //   msg: msg,
    //   url: url,
    //   line: line
    // });
    // var code = window.btoa(params);
    // var link = 'http://stat.t.sfht.com/jserror.gif?' + code;

    // var img = new Image();
    // img.width = 1;
    // img.height = 1;
    // img.onload = function() {
    //   img = img.onerror = img.onload = null;
    // }
    // img.onerror = function() {
    //   img = img.onerror = img.onload = null;
    // };
    // img.src = link;
  }


  return {
    checkEmail: function(data) {
      return /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(data)
    },

    /** [dotCode 代码打点] */
    dotCode: function() {
      if (window.LHHT && window.LHHT.T && window.LHHT.T.send) {
        LHHT.T.send();
      }
    },

    isMobile: {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      AndroidApp: function() {
        return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Adr/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      iOSApp: function() {
        return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      Firefox: function() {
        return (navigator.userAgent.indexOf("Firefox") > -1)
      },
      QQ: function() {
        return (navigator.userAgent.indexOf('QQ') > -1);
      },
      WeChat: function() {
        var isWeChat = navigator.userAgent.match(/MicroMessenger/i);
        if (isWeChat) {
          store.remove('IS_APP');
        }
        return isWeChat
      },
      AlipayChat: function() {
        var isAlipayChat = navigator.userAgent.match(/AlipayClient/i);
        if (isAlipayChat) {
          store.remove('IS_APP');
        }

        return isAlipayChat
      },
      APP: function() {
        var isApp = config.setting['is_app'] || store.get('IS_APP');

        var hash = window.location.hash;
        var search = window.location.search;
        var whole = search + hash;

        if (isApp) {
          return isApp;
        } else if (whole.indexOf('platform=android') > -1) {
          store.set('IS_APP', 'android');
          return 'android';
        } else if (whole.indexOf('platform=ios') > -1) {
          store.set('IS_APP', 'ios');
          return 'ios';
        } else {
          return false;
        }
      },

      onlineApp: function() {
        if (this.APP() && !window.cordova) {
          return true;
        } else {
          return false;
        }
      },

      localApp: function() {
        if (this.APP() && window.cordova && window.sf) {
          return true;
        } else {
          return false;
        }
      },

      any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) || this.Firefox();
      }
    },

    namespace: function(name) {
      var arr = name.split('.');
      var container = sf;

      for (var i = 0; i < arr.length; i++) {
        container[arr[i]] = container[arr[i]] || {};
        container = container[arr[i]];
      }

      return container;
    },

    access: function(data, isForce) {
      if (data.stat.code === 0 && data.content[0] && data.stat.stateList[0].code === 0) {
        return true;
      } else if (data.stat.code == -180 || data.stat.code == -360) {
        if (isForce) {
          var pathname = window.location.pathname;
          if (pathname != '/login.html') {
            window.location.href = 'http://m.fengqu.com/user/login.html';
          }
        }
      } else {
        return false;
      }
    },

    clean: function(params) {
      _.each(params, function(value, key, list) {
        if (_.isUndefined(value) || _.isNull(value)) {
          delete params[key];
        }
      });

      return params;
    },

    encrypt: function(params, word) {
      _.each(params, function(value, key, list) {
        if (_.isUndefined(value)) {
          delete params[key];
        }
      });

      var arr = [];
      _.each(params, function(value, key, list) {
        arr.push(key + '=' + value);
      });

      arr.sort();

      var str = arr.join('');
      str = str + word;

      return md5(str);
    },

    tip: function(message, time) {
      var $el = $('<div class="dialog-cart" style="z-index:9999;"><div class="dialog-cart-inner" style="width:242px;padding:20px 60px;"><p style="margin-bottom:10px;">' + message + '</p></div></div>');
      if ($('.dialog-cart').length > 0) {
        return false;
      };
      $(document.body).append($el);
      $('.closeDialog').click(function(event) {
        $el.remove();
      });
      setTimeout(function() {
        $el.remove();
      }, time || "3000");
    },

    sign: function(params, isForce) {
      var that = this;
      var map = {
        'NONE': function(data, force) {
          var word = 'sfhaitao.xyz!';
          return _.extend(data, {
            _sig: sf.util.encrypt(data, word)
          });
        },

        'USERLOGIN': function(data, force) {
          var csrf = store.get('csrfToken')

          if (csrf) {
            return _.extend(data, {
              _sig: that.encrypt(data, csrf)
            });
          } else {

            if (force) {
              var pathname = window.location.pathname;
              if (pathname != '/login.html') {
                window.location.href = 'http://m.fengqu.com/user/login.html';
              }
            } else {
              return data;
            }
          }
        }
      };

      var action = map[params.level];
      if (_.isFunction(action)) {
        var p = _.extend(params.data, {
          _aid: 1,
          _sm: 'md5'
        });
        return action(p);
      } else {
        return params.data;
      }
    }
  };

});