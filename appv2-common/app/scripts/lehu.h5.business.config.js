define('lehu.h5.business.config', ['zepto'], function($) {
  'use strict';

  //链接访问前缀
  var URL_HOST = 'http://app.lehumall.com/html5/app/';
  //action访问前缀
  var REQUEST_HOST = 'http://app.lehumall.com/'

  //版本号
  var VER = $('#version').attr('data-version') || Date.now();

  //超链接
  var LINK = {
    'index': URL_HOST + '?t=' + VER,
    'list': URL_HOST + 'list.html?t=' + VER
  };

  //ACTION配置
  var ACTION = {
    "appNewIndexFirst": "initIndex.do",
    "goodsCategoryList": "goodsList.do",
    "goodsInfo": "goodsInfo.do",
    'getLHTicket': "getLHTicket.do",
    'login': "forge/login.do",
    "register": "forge/register.do",
    "verifycode": "appMessageVerify.do",
    "appFindPasswordSave": "appFindPasswordSave.do",
    "ticketData": "ticketData.do",
    "queryRegistrationAgreement": "forge/queryRegistrationAgreement.do",
    "login4Code": "forge/login4Code.do",

    "addFocus": "addFocus.do",
    "cancelFocus": "cancelFocus.do",
    "queryGoodsReview": "queryGoodsReview.do",
    "goodsContent": "goodsContent.do",
    "queryGoodsStock": "queryGoodsStock.do",
    "queryFilteredRegion": "queryFilteredRegion.do",
    "addCart": "addCart.do",
    "cartPromptlyInitLoad": "cartPromptlyInitLoad.do",
    "getKey": "getKey.do"
  };

  return {
    setting: {
      'ver': VER,
      'REQUEST_HOST': REQUEST_HOST,
      'action': ACTION,
      'link': LINK
    }
  };
});