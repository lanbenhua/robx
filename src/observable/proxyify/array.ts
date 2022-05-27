/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProxyNonBaseTypeObjectOption } from '../../types';
import { ProxyDefaultObject } from './default';

const ArraySize = 'length';

class ProxyArray<V = any, D extends Array<V> = Array<V>> extends ProxyDefaultObject<D> {
  private collectArrayDeps(obj: D, key: PropertyKey) {
    const noNeedCollect = typeof Reflect.get(obj, key) === 'function';
    if (noNeedCollect) return;
    if (key === ArraySize) return this.collectSize();
    this.collect(key);
  }

  protected getValue(obj: D, key: PropertyKey) {
    // console.log('getting ', key.toString(), ' for ', obj);
    this.collectArrayDeps(obj, key);
    return Reflect.get(obj, key);
  }

  protected shouldIgnoreChange(_: D, key: PropertyKey) {
    return key !== ArraySize;
  }

  protected shouldDispatchSize(obj: D, key: PropertyKey) {
    return key !== ArraySize && super.shouldDispatchSize(obj, key);
  }
}

export const proxyForArray = <V>(option: IProxyNonBaseTypeObjectOption<Array<V>>) => {
  return new ProxyArray<V>(option).getProxy();
};
