/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProxyNonBaseTypeObjectOption } from '../../types';
import { iteratorTraverser } from '../../lib/utils';
import { BaseProxyObject } from './base';

class ProxySetObject<V = any, D extends Set<V> = Set<V>>
  extends BaseProxyObject<D>
  implements Set<V> {
  constructor(option: IProxyNonBaseTypeObjectOption<D>) {
    super(option);
    this.init();
  }

  get size() {
    this.collectValues();
    return this.data.size;
  }

  init() {
    const origins = iteratorTraverser(this.data);
    origins.forEach(([_, value]) => this.add(value));
  }

  add(addValue: V) {
    const key = this.getOriginalValue(addValue);
    const value = this.getProxyValue(key, addValue);
    const has = this.data.has(value);
    /**
     * for the baseType data, if the `value` is the same with the previous
     * in order to impove the performance, we will not trigger dispatch
     */
    if (has && this.isBaseType(addValue)) return this;

    if (!has) {
      this.data.add(value);
    }

    /**
     * for the non-baseType data, even though the data reference is never changed
     * we will trigger dispatch as well
     */
    this.dispatchValues();
    this.dispatch(key);

    return this;
  }

  clear() {
    if (this.size === 0) return;

    const keys = this.data.keys();
    let didDelete = false;
    for (const value of keys) {
      const key = this.getFromShadow(value);
      if (this.delValue(key, value)) {
        didDelete = true;
        this.dispatch(key);
      }
    }

    if (didDelete) this.dispatchValues();
  }

  delete(deleteValue: V) {
    const key = this.getOriginalValue(deleteValue);
    const { proxy } = this.getProxyFromCache(key, deleteValue);
    if (!proxy) return;

    const isDelete = this.delValue(key, proxy);

    if (isDelete) {
      this.dispatchValues();
      this.dispatch(key);
    }

    return isDelete;
  }

  private delValue(key: V, value: V) {
    this.clearShadow(key);
    return this.data.delete(value);
  }

  has(originalValue: V) {
    const key = this.getOriginalValue(originalValue);
    this.collect(key);
    return this.isBaseType(key) ? this.data.has(key) : this.isShadowed(key);
  }

  keys() {
    this.collectValues();
    return this.data.keys();
  }

  values() {
    // for Set, `values` change only happens when `keys` change
    this.collectValues();
    return this.data.values();
  }

  forEach(handler: (value: V, value2: V, data: D) => void, thisArg?: any): void {
    this.collectValues();
    return this.data.forEach(handler, thisArg);
  }

  entries() {
    // for Set, `entries` change only happens when `keys` change
    this.collectValues();
    return this.data.entries();
  }

  [Symbol.iterator]() {
    this.collectValues();
    return this.data[Symbol.iterator]();
  }

  get [Symbol.toStringTag]() {
    return this.data[Symbol.toStringTag];
  }

  getSetValue = (value: V) => {
    const key = this.getOriginalValue(value);
    return this.getFromShadow(key);
  };
}

export const proxyForSet = <V>(option: IProxyNonBaseTypeObjectOption<Set<V>>) => {
  return new ProxySetObject<V>(option);
};
