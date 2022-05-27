/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { dispatchReactions } from '../lib/batch-dispatch';
import { IActionFunction } from '../types';

let globalAction = 0;

export const isInAction = () => {
  return globalAction > 0;
};

const actionRunnerCreator = (action: Function) => (...args: any) => {
  globalAction++;
  try {
    const ret = action(...args);
    return ret;
  } finally {
    globalAction--;
    if (globalAction === 0) {
      dispatchReactions();
    }
  }
};

const actionWrapper = (instance: any, propertyKey: PropertyKey, action: Function) => {
  const actionRunner = actionRunnerCreator(action);

  Object.defineProperty(instance, propertyKey, {
    value: actionRunner,
    writable: false,
    configurable: true,
    enumerable: true,
  });

  return actionRunner;
};

const reportErrorIfNotFunction = (fn: any) => {
  if (typeof fn === 'function') return;
  throw new Error('@action can only decorate a function');
};

/**
 * To decorate arrow function
 *
 * class Store {
 *   @action
 *   update = (data) => {
 *     this.data = data;
 *   }
 * }
 */
const defineArrowFunctionProperty = (target: any, propertyKey: PropertyKey) => {
  Object.defineProperty(target, propertyKey, {
    set(original) {
      reportErrorIfNotFunction(original);
      actionWrapper(this, propertyKey, original);
    },
  });
};

/**
 * To decorate method in Class through `@action.bound`
 * `@action.bound` will force bind the function scope to the instance of the Class
 *
 * class Store {
 *   @action.bound
 *   update(data) {
 *     this.data = data;
 *   }
 * }
 */
const defineClassMethodWithBoundProperty = (
  _: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
) => {
  reportErrorIfNotFunction(descriptor.value);
  return {
    get() {
      const bindScopeValue = descriptor.value.bind(this);
      return actionWrapper(this, propertyKey, bindScopeValue);
    },
  };
};

/**
 * To decorate method in Class through `@action`
 *
 * class Store {
 *   @action
 *   update(data) {
 *     this.data = data;
 *   }
 * }
 */
const defineClassMethodProperty = (_: any, __: PropertyKey, descriptor: PropertyDescriptor) => {
  const original = descriptor.value;
  reportErrorIfNotFunction(original);
  descriptor.value = function (...args: any) {
    return actionRunnerCreator(original.bind(this))(...args);
  };
};

const actionDecorator = (forceBound: boolean) => (
  target: any,
  propertyKey: PropertyKey,
  descriptor?: PropertyDescriptor
) => {
  if (!descriptor) return defineArrowFunctionProperty(target, propertyKey);
  if (forceBound) return defineClassMethodWithBoundProperty(target, propertyKey, descriptor);
  return defineClassMethodProperty(target, propertyKey, descriptor);
};

export const action: IActionFunction & { bound?: IActionFunction } = actionDecorator(false);

action.bound = actionDecorator(true);
