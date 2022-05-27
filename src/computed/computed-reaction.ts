import { BaseObservableState } from '../lib/base-observable-state';
import { onlyComputedWrapper } from '../lib/computed-utils';
import { BaseReaction } from '../lib/base-reaction';
import { IArgumentsFunction } from '../types';

export class ComputeReaction extends BaseReaction {
  private observableState: BaseObservableState;
  private propertyKey: PropertyKey;
  private cachedValue: unknown;
  constructor(key: PropertyKey, fn: IArgumentsFunction) {
    super();
    this.propertyKey = key;
    this.init(fn);
  }

  init(fn: IArgumentsFunction) {
    this.observableState = new BaseObservableState(this.propertyKey.toString());
    this.setUpdate(fn);
    this.runReaction(true);
  }

  run() {
    this.runReaction(false);
  }

  private runReaction(init: boolean) {
    enterComputeReactionStack(this);
    this.clearDeps();
    try {
      this.cachedValue = super.run();
    } finally {
      removeComputeReactionStackHead();
    }

    if (init) return;
    this.dispatch();
  }

  dispatch() {
    this.observableState.beCarefulThisIsADangerousDispatch(this.propertyKey);
  }

  getData() {
    this.observableState.collect(this.propertyKey);
    return this.cachedValue;
  }
}

/**
 * @computed is different from component render
 * class Store {
 *  @observable
 *  foo = 'bar';
 *  @computed
 *  get a() { // computeReaction a
 *    return this.b;
 *  }
 *
 *  @computed
 *  get b() { // computeReaction a
 *    return this.c;
 *  }
 *
 *  @computed
 *  get c() { // computeReaction c
 *    return this.foo;
 *  }
 * }
 * const store = new Store();
 * when reading `store.a`, the ComputeReaction stack will be:
 *   |computeReaction c|
 *   |computeReaction b|
 *   |computeReaction a|
 */
const globalComputeReaction: ComputeReaction[] = [];

const enterComputeReactionStack = (c: ComputeReaction) => {
  globalComputeReaction.unshift(c);
};

const removeComputeReactionStackHead = () => {
  globalComputeReaction.shift();
};

export const getComputeReactionStackHead = () => globalComputeReaction[0];

export const computedDecorator = (
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
  onlyComputed = false
) => {
  const getter = descriptor.get;

  let computeCache: ComputeReaction = null;
  descriptor.get = function () {
    const handler = () => {
      if (!computeCache) {
        computeCache = new ComputeReaction(propertyKey, getter.bind(this));
      }
      return computeCache.getData();
    };
    if (onlyComputed) return onlyComputedWrapper(handler);
    return handler();
  };
};
