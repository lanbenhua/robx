/* eslint-disable @typescript-eslint/no-explicit-any */
import { observable, action } from '../../src';

class MapStore {
  @observable
  data: Map<any, any>;

  childrenRenderTimes = 0;

  @action.bound
  init() {
    this.data = new Map([['initKey1', 'bar']]);
    this.childrenRenderTimes = 0;
  }

  @action.bound
  set(key: any, value: any) {
    this.data.set(key, value);
  }

  @action.bound
  delete(key: any) {
    this.data.delete(key);
  }

  @action.bound
  clear() {
    this.data.clear();
  }
}

export const mapStore = new MapStore();
