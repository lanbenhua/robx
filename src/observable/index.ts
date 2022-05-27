/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObservableState } from './state';

export const clone = Symbol('$$clone');

const clonePropertyOnce = (instance: any) => {
  if (instance[clone]) return false;

  Object.defineProperty(instance, clone, {
    value: new ObservableState(instance.constructor.name).getProxy(),
    enumerable: false,
    writable: false,
    configurable: true,
  });

  return true;
};

export function observable(target: any, propertyKey: PropertyKey) {
  Object.defineProperty(target, propertyKey, {
    get: function () {
      clonePropertyOnce(this);
      return this[clone][propertyKey];
    },
    set: function (value: unknown) {
      clonePropertyOnce(this);
      this[clone][propertyKey] = value;
    },
  });
}
