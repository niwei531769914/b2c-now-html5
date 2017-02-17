# Global





* * *

## Class: comm
comm的合并通信

### comm.init(comms) 

在init方法中传入comm的队列

**Parameters**

**comms**: `List.&lt;Comm&gt;`, comms 需要合并的接口Array


### comm.buildApi(comms) 

为multiple创建api对象

**Parameters**

**comms**: `List.&lt;Comm&gt;`, 需要合并的接口Array


### comm.buildRequestData() 

对multiple的comms做数据处理


### comm.access(response, isForceUserLogin) 

返回的参数是否正确

**Parameters**

**response**: `Map`, 服务端返回的信息

**isForceUserLogin**: `Boolean`, 是否需要强制登陆


### comm.request(data, isForceUserLogin) 

comm的合并通信

**Parameters**

**data**: `Map`, 请求参数

**isForceUserLogin**: `Boolean`, 是否需要强制登陆

**Returns**: `can.Deferred`



* * *










