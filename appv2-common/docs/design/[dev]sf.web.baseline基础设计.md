[dev]sf.web.baseline基础设计
============================

![](https://raw.githubusercontent.com/sf-haitao/haitao-web-baseline/dev/docs/design/img/sf.web.baseline.png?token=ABquZpOFbRpr53o8kakaMAuECX3cBqmmks5UioUtwA%3D%3D)

Adapter
----------------------------

`Adapter`是对`can.Map`的继承，是对渲染数据的封装。从服务端下发的数据是`DataModel`，从服务端获取之后，经过`format`之后，转成`ViewModel`.`ViewModel`对应`Template`渲染成`View`。

Comm
----------------------------

`Comm`是对`can.Construct`的继承，通过`Comm`对接口做输入检查、输出检查和错误处理。`Comm`会知道`Adapter`，获得数据源之后，`Adapter`做接口的数据处理，以获得可以渲染模版的数据

Template
----------------------------

`Template`是对`can.Mustache`实现

ViewController
----------------------------

`ViewController`是对`can.Control`的继承，拥有`Comm`获取服务端数据，通过`Adapter`转换数据，通过模版渲染页面，添加到前台页面，同时将事件绑定在`View`上

ViewComponent
-----------------------------

ViewPage
-----------------------------

App
-----------------------------