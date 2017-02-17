测试用例开发
==============

[mocha](http://mochajs.org/)
--------------

Mocha是一个Javascript的单元测试工具，在Nodejs和浏览器中都可以使用

参考文档

＋[使用Mocha进行测试](https://github.com/WebView/webview/tree/master/tools/mocha)
+ [【Hour级学习成本】Javascript单元测试工具“抹茶”——Mocha 和 Chai](http://www.alloyteam.com/2013/12/hour-class-learning-costs-javascript-unit-testing-tool-matcha-mocha-and-chai/)

Mocha只是一个测试框架，他没有自己的断言库，需要引用第三方的断言库，常用的是[chai](http://chaijs.com/)

关于chai的内容需要涉及到它的[API](http://chaijs.com/api/)

api接口测试配置
--------------

1. 安装使用SwitchySharp插件
2. 情景模式添加用例 - sfht
    配置代理
    localhost:9001
3. 切换规则配置

    ```
    ^(?!http:\/\/www\.sfht\.com\/m.api)(http:\/\/www\.sfht\.com\/)  ->  sfht
    http://www.sfht.com/m.api -> 直接连接
    ```

文件夹里面我已经放了一个备份，直接导入就可以了

接口测试
---------------

使用命令

```
grunt test:browser
```

然后手动打开页面
```
www.sfht.com
```

备用

```
/^http:\/\/www\.sfht\.com($|((\/+)(?!\/)(?!m.api(\?|$|\/|#))))/gi
```