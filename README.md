# zookeeper-util

A simple utility Boilerplate code for Zookeeper Clients

Typescript:
```js

import ZkUtil, { PropertyType } from 'zookeeper-util';
try {
  await ZkUtil.init({
          "connectionParam": "<ip>:<port>, <ip>:<port>, <ip>:<port>",
          "basePath": "/orgName/serviceName/",
          "options": {sessionTimeout: 5000, retries: 1}
        });
  // Zookeeper Connected

  const result = await ZkUtil.getProperty('foo', PropertyType.STRING);
} catch(e) {

}
```


## Installation

```sh
$ npm install zookeeper-util
```


# API Reference

### Methods

#### ZkUtil.init(zkInfo, watcher);

Used to init the client; opens connections to ZK. Watcher is optional

####Usage:

```js
ZkUtil.init({
          "connectionParam": "<ip>:<port>, <ip>:<port>, <ip>:<port>",
          "basePath": "/orgName/serviceName/",
          "options": {sessionTimeout: 5000, retries: 1}
        }, function(error: Error, data: any) {
        
        });
```

Returns a void Promise


Please raise any issue/Pull Requests