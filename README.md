# zookeeper-util

A simple utility Boilerplate code for Zookeeper Clients (Promise based)

###Typescript:
```js

import ZookeeperUtil, { PropertyType } from 'zookeeper-util';
try {
  await ZookeeperUtil.init({
          "connectionParam": "<ip>:<port>, <ip>:<port>, <ip>:<port>",
          "basePath": "/orgName/serviceName/",
          "options": {sessionTimeout: 5000, retries: 1}
        });
  // Zookeeper Connected

  const result = await ZookeeperUtil.getProperty('foo', PropertyType.STRING, function(err: Error, data: any) {
    // Optional Watcher
    // Will return Property Data, When updated.
  });
} catch(e) {

}
```

###Node.js:
```js

const zookeeperUtil  =  require('zookeeper-util');
const PROPERTY_TYPES = {
    NUMBER: 0,
    STRING: 1,
    OBJECT: 2,
    BOOLEAN: 3
};

try {
  await ZookeeperUtil.init({
          "connectionParam": "<ip>:<port>, <ip>:<port>, <ip>:<port>",
          "basePath": "/orgName/serviceName/",
          "options": {sessionTimeout: 5000, retries: 1}
        });
  // Zookeeper Connected

  const result = await ZookeeperUtil.getProperty('foo', PropertyType["STRING"], function(err: Error, data: any) {
    // Optional Watcher
    // Will return Property Data, When updated.
  });
} catch(e) {

}
```

## Installation

```sh
$ npm install zookeeper-util
```


# API Reference

### Objects

#### zkInfo

Passed in the init method
- `connectionParam`: Comma seperated list of Ip:port (Cluster/Standalone) 
- `basePath`: Base Path for the Zookeeper Client. All the property get would be referenced with this base path.
- `options`: Zookeeper Options, passed as it is. Please refer to `node-zookeeper-client` for all available options

#### PropertyType
enum { STRING, NUMBER, BOOLEAN, OBJECT }

### Methods

#### ZookeeperUtil.init(zkInfo);

Used to init the client; opens connections to ZK

####Usage:

```js
ZookeeperUtil.init({
          "connectionParam": "<ip>:<port>, <ip>:<port>, <ip>:<port>",
          "basePath": "/orgName/serviceName/",
          "options": {sessionTimeout: 5000, retries: 1}
        });
```

Returns a void Promise

#### ZkUtil.getProperty(propertyKey, propertyType, watcher);

Get the Zookeeper Property. Watcher is optional

####Usage:

```js
// Absolute Path: basePath + propertyKey
const result = await ZookeeperUtil.getProperty('foo', PropertyType.OBJECT, function(error, data) {});

ZookeeperUtil.getProperty('foo/bar/cat', PropertyType.STRING, function(error, data) {});
```

Returns a Promise

Note: `/` in the getProperty should be validated with the basePath suffixing with `/`

#### ZkUtil.setProperty(propertyKey, data);

Sets the Zookeeper Property. Data Types supported are Property Types mentioned above

####Usage:

```js
ZookeeperUtil.setProperty('foo', 'test');

ZookeeperUtil.setProperty('foo/bar/cat', {'test': 'test'});
```

Returns a void Promise

Note: `/` in the setProperty should be validated with the basePath suffixing with `/`/


#### ZkUtil.registerWatcher(propertyKey, propertyType, watcher);

Sets the Zookeeper Watcher on the Property. Data Types supported are Property Types mentioned above

####Usage:

```js
const watcher = (err, data) => {};
ZookeeperUtil.registerWatcher('foo', PropertyType.STRING, watcher);
```

Returns void

#### `Please raise any issues/Pull Requests at the github page.`