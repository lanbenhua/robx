/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface ConstructorOf<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type IReactionComponent<P = {}, S = {}> =
  | ConstructorOf<React.Component<P, S>>
  | React.FunctionComponent<P>;

export type IObservableValueType = IBaseType | ISupportedNonBaseType;

export type ISupportedNonBaseType = Array<any> | Map<any, any> | Set<any> | Record<any, any>;

export type IBaseType = number | string | boolean | undefined | null;

export type IIterator = (state: object, handler: (key: string, value?: any) => any) => void;

export type ICollect = (key: any) => void;
export type IDispatch = (key: any) => void;

export type IProxyCreator = (option: IProxyNonBaseTypeObjectOption<object>) => any;

export type IActionFunction = (target: any, prop: string) => void;

export type IArgumentsFunction = () => any;

export type ISubPropertyHandler = (
  displayName: PropertyKey,
  obj: ISupportedNonBaseType,
  key: any,
  value: any
) => void;

export interface IProxyNonBaseTypeObjectOption<D> {
  displayName: string;
  data: D;
  collect: ICollect;
  dispatch: IDispatch;
}
