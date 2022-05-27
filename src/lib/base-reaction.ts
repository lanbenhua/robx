import { IArgumentsFunction } from '../types';
import { BaseObservableState } from './base-observable-state';

export class BaseReaction<T = BaseObservableState> {
  private update: IArgumentsFunction;
  protected dependentGlobalStates: Set<T> = new Set();

  public setUpdate(fn: IArgumentsFunction) {
    this.update = fn;
  }

  public unmount() {
    this.update = null;
    this.dependentGlobalStates.clear();
  }

  public run() {
    return this.update?.();
  }

  public hasObservableState(state: T) {
    return this.dependentGlobalStates.has(state);
  }

  public addObservableState(state: T) {
    if (!state) return;
    this.dependentGlobalStates.add(state);
  }

  protected clearDeps() {
    // clear variables before render
    this.dependentGlobalStates = new Set();
  }
}
