/* eslint-disable @typescript-eslint/no-explicit-any */
import { isSupportedNonBaseType, shadowCompare, getValueType, isBaseType } from '../../lib/utils';
import { ICollect, IDispatch, IProxyNonBaseTypeObjectOption } from '../../types';
import { ObservableState } from '../../observable/state';

export const hasBeenWrappedByObservable = '__hasBeenWrappedByObservable__';

export class BaseProxyObject<T> {
  protected data: T;
  protected collect: ICollect;
  protected dispatch: IDispatch;
  protected symbolValues = Symbol('Values');
  protected symbolSize = Symbol('Size');
  protected displayName: string;
  private shadow = new Map();

  constructor(option: IProxyNonBaseTypeObjectOption<T>) {
    this.displayName = option.displayName;
    this.data = option.data;
    this.collect = option.collect;
    this.dispatch = option.dispatch;
  }

  protected dispatchSizeAndValues() {
    this.dispatchSize();
    this.dispatchValues();
  }

  protected dispatchSize() {
    this.dispatch(this.symbolSize);
  }

  protected dispatchValues() {
    this.dispatch(this.symbolValues);
  }

  protected collectSizeAndValues() {
    this.collectSize();
    this.collectValues();
  }

  protected collectSize() {
    this.collect(this.symbolSize);
  }

  protected collectValues() {
    this.collect(this.symbolValues);
  }

  protected isBaseType(value: any) {
    const t = getValueType(value);
    return isBaseType(t);
  }

  protected hasBeenWrappedByObservable(key: any) {
    return key === hasBeenWrappedByObservable;
  }

  get [hasBeenWrappedByObservable]() {
    return true;
  }

  protected isSameValue(oldValue: any, newValue: any) {
    return shadowCompare(oldValue, newValue);
  }

  /**
   * to resolve this case
   * __tests__/__mocks__/set-component.tsx#L56
   * __tests__/observable/set.test.tsx#L244
   */
  protected getOriginalValue<V>(value: V) {
    if (this.isBaseType(value)) return value;
    if (!(value as any)[hasBeenWrappedByObservable]) return value;
    if (this.shadow.has(value)) return this.getFromShadow(value);

    console.error(
      `Please don't use an Observable data as value, it will make your program logic very complicated, this is not a good practice`
    );

    return value;
  }

  protected getProxyFromCache(key: any, value: any) {
    const originalValue = this.getOriginalValue(value);
    if (this.isBaseType(originalValue)) return { proxy: originalValue, originalValue };
    if (this.isShadowed(key)) {
      const previousProxy = this.getFromShadow(key);
      const previousValue = this.getFromShadow(previousProxy);
      if (previousValue === originalValue) {
        return { proxy: previousProxy, originalValue };
      }
      this.clearShadow(key);
    }

    return { originalValue, proxy: null };
  }

  protected clearShadow(key: any) {
    const value = this.shadow.get(key);
    this.shadow.delete(key);
    this.shadow.delete(value);
  }

  protected isShadowed(key: any) {
    return this.shadow.has(key);
  }

  protected getFromShadow(key: any) {
    return this.shadow.get(key);
  }

  protected createProxy(key: any, state: any) {
    const stateType = getValueType(state);
    if (isBaseType(stateType)) return state;
    // unsupported data type
    if (!isSupportedNonBaseType(stateType)) return state;
    return new ObservableState(`${this.displayName}.${key}`, state).getProxy();
  }

  protected getProxyValue(key: any, value: any) {
    if (this.isBaseType(value)) return value;
    const { proxy, originalValue } = this.getProxyFromCache(key, value);
    if (proxy) return proxy;

    const newProxy = this.createProxy(key, originalValue);
    this.shadow.set(key, newProxy);
    this.shadow.set(newProxy, originalValue);
    return newProxy;
  }
}
