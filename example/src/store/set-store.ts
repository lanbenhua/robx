/* eslint-disable @typescript-eslint/no-explicit-any */

import { action, observable, getSetValue } from '../../../src';

class SetStore {
  @observable
  data: Set<any>;

  @observable
  objectData: Set<any>;

  testObj = { test: 1, notExist: false };

  childrenRenderTimes = 0;

  constructor() {
    this.init();
  }

  @action.bound
  init() {
    this.data = new Set(['initKey1']);
    this.childrenRenderTimes = 0;
    this.objectData = new Set([this.testObj]);
  }

  @action.bound
  updateObjectData() {
    const proxyTest = getSetValue(this.objectData, this.testObj);
    proxyTest.notExist = !this.testObj.notExist;
  }

  @action.bound
  deleteObjectData() {
    this.objectData.delete(this.testObj);
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
}

export const setStore = new SetStore();
