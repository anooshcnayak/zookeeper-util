import ZkUtil, { PropertyType } from '../../src/index';

ZkUtil.init({
  "connectionParam": "10.110.129.84:2181",
  "basePath": "/gameskraft/services/matrix",
  "options": {sessionTimeout: 5000, retries: 1}
}).then(() => {
  console.log("connected");

  ZkUtil.getProperty('foo', PropertyType.STRING).then((data) => {
    console.log(data);
  }).catch(err => {
    // console.log(err);
  });
}).catch(err => {
  console.log(err);
})