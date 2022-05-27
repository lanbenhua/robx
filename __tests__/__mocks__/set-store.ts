/* eslint-disable @typescript-eslint/no-explicit-any */
import { observable, action, getSetValue } from '../../src';

class SetStore {
  @observable
  data: Set<any>;

  @observable
  // eslint-disable-next-line @typescript-eslint/ban-types
  testObject: object;

  @observable
  objectData: Set<any>;

  testObj = { test: 1 };

  childrenRenderTimes = 0;

  @action.bound
  init() {
    this.data = new Set(['initKey1']);
    this.childrenRenderTimes = 0;
    this.objectData = new Set([this.testObj]);
    this.testObject = { foo: 'bar' };
  }

  @action.bound
  addObjectData() {
    this.objectData.add(this.testObj);
  }

  @action.bound
  deleteObjectData() {
    this.objectData.delete(this.testObj);
  }

  @action.bound
  updateObjectData(key: string, value: string) {
    const proxy = getSetValue(this.objectData, this.testObj);
    proxy[key] = value;
  }

  @action.bound
  add(value: any) {
    this.data.add(value);
  }

  hasObject() {
    return this.data.has(this.testObj);
  }

  @action.bound
  addObject() {
    this.data.add(this.testObj);
  }

  @action.bound
  deleteObject() {
    this.data.delete(this.testObj);
  }

  @action.bound
  delete(key: any) {
    this.data.delete(key);
  }

  @action.bound
  clear() {
    this.data.clear();
  }

  @action.bound
  addObservableData() {
    this.objectData.add(this.testObject);
  }
}

export const setStore = new SetStore();
