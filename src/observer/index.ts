/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import React from 'react';

import { ConstructorOf, IReactionComponent } from '../types';
import { reactionFunction } from './function';
import { reactionClass } from './class';

export function observer<T extends IReactionComponent<object, object>>(component: T): T {
  if (typeof component.prototype.render === 'function') {
    return reactionClass(component as ConstructorOf<React.Component<object, object>>) as T;
  }
  return reactionFunction(component as React.FunctionComponent<object>) as T;
}
