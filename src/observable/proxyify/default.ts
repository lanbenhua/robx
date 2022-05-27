/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProxyObject, hasBeenWrappedByObservable } from './base';
import { IProxyNonBaseTypeObjectOption } from '../../types';
import { objectTraverser } from '../../lib/utils';

export class ProxyDefaultObject<D extends {} = {}> extends BaseProxyObject<D> {
  constructor(option: IProxyNonBaseTypeObjectOption<D>) {
    super(option);
    this.init();
  }

  init() {
    const origins = objectTraverser(this.data);
    origins.forEach(([key, value]) => this.setValue(this.data, key, value));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private delValue(obj: D, key: PropertyKey) {
    const has = Reflect.has(obj, key);
    this.clearShadow(key);
    /**
     * `Reflect.deleteProperty` return true forever
     * so we have to return `has`
     */
    Reflect.deleteProperty(obj, key);
    return has;
  }

  protected getValue(obj: D, key: PropertyKey) {
    // console.log('getting ', key.toString(), ' for ', obj);
    this.collect(key);
    return Reflect.get(obj, key);
  }

  protected shouldDispatchSize(obj: D, key: PropertyKey) {
    return !Reflect.has(obj, key);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldIgnoreChange(_: D, __: PropertyKey, ___: any) {
    return true;
  }

  protected setValue(obj: D, key: PropertyKey, value: any) {
    // console.log('setting ', key.toString(), ' for ', obj, value);
    const proxy = this.getProxyValue(key, value);

    const isSameValue = this.isSameValue(Reflect.get(obj, key), proxy);
    let ret = true;

    /**
     * for the baseType data, if the `value` is the same with the previous
     * in order to impove the performance, we will not trigger dispatch
     */
    if (isSameValue && this.isBaseType(proxy) && this.shouldIgnoreChange(obj, key, value)) {
      return ret;
    }

    const shouldDispatchSize = this.shouldDispatchSize(obj, key);

    if (!isSameValue) {
      ret = Reflect.set(obj, key, proxy);
    }

    /**
     * for the non-baseType data, even though the data reference is never changed
     * we will trigger dispatch as well
     */
    this.dispatch(key);
    if (shouldDispatchSize) this.dispatchSize();

    return ret;
  }

  getProxy() {
    return new Proxy(this.data, {
      get: (obj, key) => {
        // hasBeenWrappedByObservable
        if (this.hasBeenWrappedByObservable(key)) {
          return this[hasBeenWrappedByObservable];
        }

        return this.getValue(obj, key);
      },

      set: (obj, key, value) => {
        return this.setValue(obj, key, value);
      },

      deleteProperty: (obj, key) => {
        const isDelete = this.delValue(obj, key);
        if (isDelete) {
          this.dispatch(key);
          this.dispatchSize();
        }
        return true;
      },

      /**
       * to support `Object.keys(store.object | store.array)` case
       */
      ownKeys: (obj) => {
        this.collectSize();
        return Reflect.ownKeys(obj);
      },
    });
  }
}

export const defaultProxyStrategy = (option: IProxyNonBaseTypeObjectOption<object>) => {
  return new ProxyDefaultObject(option).getProxy();
};
