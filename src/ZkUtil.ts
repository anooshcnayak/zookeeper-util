import { PropertyType } from './PropertyType';

const zookeeper = require('node-zookeeper-client');
import assert = require('assert');

const PROPERTY_TYPES = {
  NUMBER: 1,
  STRING: 2,
  OBJECT: 3,
  BOOLEAN: 4
};

class ZkUtil {

  private watchers: any = {};
  private path: string = '';
  private client: any;

  constructor() {
    this.client = undefined;
  }

  async init(zkInfo: any, watcher?: any): Promise<void> {
    assert(
      zkInfo && typeof zkInfo === "object",
      "zkInfo should be an object and NOT null"
    );
    assert(
      zkInfo.basePath && typeof zkInfo.basePath === "string",
      "zkInfo.basePath should contain a basePath<string>"
    );
    assert(
      zkInfo.connectionParam && typeof zkInfo.connectionParam === "string",
      "zkInfo.connectionParam should contain a connectionParam<string>"
    );
    assert(
      zkInfo.options && typeof zkInfo.options === "object",
      "zkInfo.options is mandatory. Specify the ZK options"
    );

    this.path = zkInfo.basePath;

    if (watcher) {
      assert(typeof watcher === "function", "Watcher must be a Function");
      this.watchers[this.path] = watcher;
    }

    this.client = zookeeper.createClient(
      zkInfo.connectionParam,
      zkInfo.options
    );

    return new Promise((resolve: any, reject: any) => {
      this.client.once("connected", () => {
        resolve();
      });

      // TODO Add timeout and error cases and reject approp

      this.client.connect();
    });
  }

  registerWatcher(key: string, propertyType: PropertyType, watcher: any): void {
    const keyPath: string = `${this.path}/${key}`;
    this.watchers[keyPath] = watcher;
    this.getProperty(key, propertyType).then(() => {});
  }

  async getProperty(key: string, type: PropertyType, watcher?: any): Promise<any> {
    // console.log('Fetching value from zookeeper %s', JSON.stringify({key, type}));

    const keyPath: string = `${this.path}/${key}`;
    this.watchers[keyPath] = watcher; // Adding watcher

    const _this = this;

    return new Promise<any>((resolve: any, reject: any) => {
      this.client.getData(keyPath, function(event: any) {
        // data changed for key
        // console.log('data changed');
        if (event && event.type === 3 && _this.watchers[keyPath]){
          // console.log(event);
          _this.getProperty(key, type);
        }
      }, function (error: Error, data: any) {
        if(error) {
          reject(error);
          return;
        }

        if (data) {
          data = data.toString('utf8');
        }

        switch(type) {
          case PropertyType.NUMBER:
            data = parseInt(data);
            break;
          case PropertyType.OBJECT:
            data = JSON.parse(data);
            break;
          case PropertyType.BOOLEAN:
            data = (data === 'true');
            break;
          default:
            break;
        }

        resolve(data);
      });
    });
  }

  setProperty(key:string, data: any): Promise<void> {
    const keyPath: string = `${this.path}/${key}`;

    return new Promise<void>((resolve: any, reject: any) => {
      this.client.setData(keyPath, ZkUtil.converDataToUtf8(data), function(error: Error) {
        if(error) {
          // console.log("zookeeperUtil:: setData:: %s :: %s", keyPath, error);
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  static converDataToUtf8(data: any) {
    const dataAsString = JSON.stringify(data);
    const dataBuffer = Buffer.from(dataAsString, 'utf8');
    return dataBuffer;
  }
}

export default ZkUtil;
