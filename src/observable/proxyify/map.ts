/* eslint-disable @typescript-eslint/no-explicit-any */

import { IProxyNonBaseTypeObjectOption } from '../../types';
import { iteratorTraverser } from '../../lib/utils';
import { BaseProxyObject } from './base';

class ProxyMapObject<K = any, V = any, D extends Map<K, V> = Map<K, V>>
  extends BaseProxyObject<D>
  implements Map<K, V> {
  constructor(option: IProxyNonBaseTypeObjectOption<D>) {
    super(option);
    this.init();
  }

  get size() {
    this.collectSize();
    return this.data.size;
  }

  init() {
    const origins = iteratorTraverser(this.data);
    origins.forEach(([key, value]) => this.set(key, value));
  }

  set(key: K, input: V) {
    const has = this.data.has(key);

    let isSameValue = false;
    const proxyValue = this.getProxyValue(key, input);

    if (has) {
      isSameValue = this.isSameValue(this.data.get(key), proxyValue);
    }

    /**
     * for the baseType data, if the `value` is the same with the previous
     * in order to impove the performance, we will not trigger dispatch
     */
    if (isSameValue && this.isBaseType(input)) return this;

    if (!isSameValue) {
      this.data.set(key, proxyValue);
    }

    /**
     * for the non-baseType data, even though the data reference is never changed
     * we will trigger dispatch as well
     */
    this.dispatch(key);
    this.dispatchValues();
    if (!has) this.dispatchSize();

    return this;
  }

  get(key: K) {
    this.collect(key);
    return this.data.get(key);
  }

  has(key: K) {
    this.collect(key);
    return this.data.has(key);
  }

  delete(key: K) {
    const isDelete = this.delValue(key);
    if (isDelete) {
      this.dispatchSizeAndValues();
      this.dispatch(key);
    }
    return isDelete;
  }

  private delValue(key: K) {
    this.clearShadow(key);
    return this.data.delete(key);
  }

  clear() {
    if (this.size === 0) return;

    const keys = this.data.keys();
    let didDelete = false;
    for (const key of keys) {
      if (this.delValue(key)) {
        didDelete = true;
        this.dispatch(key);
      }
    }

    if (didDelete) this.dispatchSizeAndValues();
  }

  keys() {
    this.collectSize();
    return this.data.keys();
  }

  values() {
    this.collectValues();
    return this.data.values();
  }

  forEach(handler: (value: V, key: K, map: D) => void, thisArg?: any) {
    this.collectSizeAndValues();
    return this.data.forEach(handler, thisArg);
  }

  entries() {
    this.collectSizeAndValues();
    return this.data.entries();
  }

  [Symbol.iterator]() {
    this.collectSizeAndValues();
    return this.data[Symbol.iterator]();
  }

  get [Symbol.toStringTag]() {
    return this.data[Symbol.toStringTag];
  }
}

export const proxyForMap = <K, V>(option: IProxyNonBaseTypeObjectOption<Map<K, V>>) => {
  return new ProxyMapObject<K, V>(option);
};
