/* eslint-disable @typescript-eslint/no-explicit-any */

import { IObservableValueType } from '../types';

export const getValueType = (value: any) => {
  let baseType: string = Object.prototype.toString.call(value);
  baseType = baseType.slice(1, baseType.length - 1);

  return baseType.split(' ')[1];
};

export const isBaseType = (t: string) => {
  return t === 'Number' || t === 'String' || t === 'Boolean' || t === 'Undefined' || t === 'Null';
};

export const isSupportedNonBaseType = (t: string) => {
  return t === 'Object' || t === 'Array' || t === 'Map' || t === 'Set';
};

export const shadowCompareObject = (v1: IObservableValueType, v2: IObservableValueType) => {
  const t1 = getValueType(v1);
  const t2 = getValueType(v2);

  if (t1 !== t2) return false;

  if (isBaseType(t1)) return shadowCompare(v1, v2);
  if (t1 !== 'Object' && t1 !== 'Array') return shadowCompare(v1, v2);

  const keys1 = Object.keys(v1);
  const keys2 = Object.keys(v2);

  if (keys1.length !== keys2.length) return false;
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (
      !Object.prototype.hasOwnProperty.call(v2, key) ||
      !shadowCompare((v1 as Record<any, any>)[key], (v2 as Record<any, any>)[key])
    ) {
      return false;
    }
  }

  return true;
};

export const shadowCompare = (v1: any, v2: any) => {
  return v1 === v2;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getSetValue = (observableSet: object, key: any) => {
  const getter = Reflect.get(observableSet, 'getSetValue');
  return getter.call(observableSet, key);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const objectTraverser = (state: object) => {
  const origins: [any, any][] = [];
  for (const key in state) {
    origins.push([key, state[key as keyof typeof state]]);
  }

  return origins;
};

export const iteratorTraverser = (state: Set<any> | Map<any, any>) => {
  const origins: [any, any][] = [];
  for (const [key, value] of state.entries()) {
    origins.push([key, value]);
    state.delete(key);
  }

  return origins;
};
