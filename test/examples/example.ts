import ZookeeperUtil, { PropertyType } from '../../src/index';

ZookeeperUtil.init({
  "connectionParam": "10.110.129.84:2181",
  "basePath": "/gameskraft/services/matrix",
  "options": {sessionTimeout: 5000, retries: 1}
}).then(() => {
  console.log("connected");

  ZookeeperUtil.getProperty('foo', PropertyType.STRING, (err: Error, data: any) => {
    console.log("Watcher", err, data);
  }).then((data) => {
    console.log(data);
  }).catch(err => {
    // console.log(err);
  });
}).catch(err => {
  console.log(err);
})