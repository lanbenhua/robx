/* eslint-disable @typescript-eslint/ban-types */
import { BaseObservableState } from '../lib/base-observable-state';
import { defaultProxyStrategy } from './proxyify/default';
import { ISupportedNonBaseType } from '../types';
import { strategyMapping } from './proxyify';
import { getValueType } from '../lib/utils';

export class ObservableState extends BaseObservableState {
  private proxy: ProxyConstructor;
  private baseState: ISupportedNonBaseType = {};

  constructor(displayName: string, baseState = {}) {
    super(displayName);
    this.baseState = baseState;
  }

  private getProxyStrategy() {
    const dataType = getValueType(this.baseState);
    return (strategyMapping[dataType] || defaultProxyStrategy)({
      displayName: this.displayName,
      data: this.baseState,
      dispatch: (key) => this.dispatch(key),
      collect: (key) => this.collect(key),
    });
  }

  private initialProxy() {
    this.proxy = this.getProxyStrategy();
  }

  public getProxy() {
    this.initialProxy();
    return this.proxy;
  }
}
