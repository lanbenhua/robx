/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProxyCreator } from '../../types';
import { proxyForArray } from './array';
import { proxyForMap } from './map';
import { proxyForSet } from './set';

export const strategyMapping: Record<string, IProxyCreator> = {
  Map: proxyForMap,
  Set: proxyForSet,
  Array: proxyForArray,
};
