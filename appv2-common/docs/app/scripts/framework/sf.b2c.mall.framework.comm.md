# Global





* * *

## Class: comm
comm通信基类

**api**: `Object` , api的定义需要被每个子类复写
### comm.buildRequestData() 

通过与定义的API接口和用户通过this.data传入的参数构建向服务端发起请求需要用到的数据

**Returns**: `Object`, 向服务端提交的数据结构

### comm.init(data) 

初始化方法

**Parameters**

**data**: `Object`, 传入的涌来提交服务端的数据


### comm.setData() 

修改请求参数


### comm.sendRequest(isForceUserLogin) 

构建请求

**Parameters**

**isForceUserLogin**: `boolean`, 是否需要强制用户登录

**Returns**: `Object`, can.Deferred

### comm.validate() 

根据用户SecurityType进行检验，同时也会检验比天字段是否写入

**Returns**: `Error | Boolean`, 错误对象|验证成功

### comm.checkUserLogin() 

检查用户是否登陆

**Returns**: `Boolean`, 用户是否登陆

### comm.goToLogin() 

跳转到登陆


### comm.access(response, isForceUserLogin) 

返回的参数是否正确

**Parameters**

**response**: `Map`, 服务端返回的信息

**isForceUserLogin**: `Boolean`, 是否需要强制登陆


### comm.encrypt(params, appendWord) 

comm通信基类

**Parameters**

**params**: `Map`, 需要加密的参数

**appendWord**: `String`, 加言


### comm.sign(params, isForceUserLogin) 

comm通信基类

**Parameters**

**params**: `Map`, 参与请求签名的实体

**isForceUserLogin**: `Boolean`, 是否需要强制登陆


### comm.request(data, isForceUserLogin) 

comm通信基类

**Parameters**

**data**: `Map`, 请求参数

**isForceUserLogin**: `Boolean`, 是否需要强制登陆

**Returns**: `can.Deferred`

### comm.getServerTime() 

通过服务端接口每次从stat中返回的system在客户端中保留服务端时间

**Returns**: `Int`, 服务端时间的时间戳

### comm.afterRequest(mt, response) 

请求后处理回调

**Parameters**

**mt**: `String`, 请求后处理回调

**response**: `Map`, 请求后处理回调


### comm.ajax(data) 

调用简单的ajax请求

**Parameters**

**data**: `Map`, 请求$.ajaxSetting

**Returns**: `Object`, can.Deferred



* * *










