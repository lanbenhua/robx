import { TestContainerDeDependency } from './__mocks__/boundary-cases-component';
import { BaseObservableState } from '../src/lib/base-observable-state';
import { BaseProxyObject } from '../src/observable/proxyify/base';
import { BaseReaction } from '../src/lib/base-reaction';
import { testStore } from './__mocks__/array-store';

import renderer from 'react-test-renderer';
import React from 'react';

class TestState extends BaseObservableState {
  public addReaction(key: PropertyKey, r: BaseReaction<BaseObservableState>): void {
    return super.addReaction(key, r);
  }

  protected hasCollected(_: PropertyKey): boolean {
    return true;
  }

  public displayName: string;
}

describe('boudary cases', () => {
  let component: TestContainerDeDependency;
  beforeEach(() => {
    testStore.init();
    component = (renderer
      .create(<TestContainerDeDependency />)
      .getInstance() as unknown) as TestContainerDeDependency;
  });

  test('BaseObservableState addReaction null', () => {
    const baseOS = new TestState('TestStore');
    expect(baseOS.addReaction('test-key', null)).toBeUndefined();
  });

  test('BaseObservableState dispatch non-string', () => {
    const baseOS = new TestState('TestStore');
    expect(() => baseOS.dispatch(Symbol('test'))).toThrowError(
      `When changing an observable data \`${baseOS.displayName}\``
    );
  });

  test('BaseReaction addObservableState null', () => {
    const baseReaction = new BaseReaction();
    expect(baseReaction.addObservableState(null)).toBeUndefined();
  });

  test('test de-dependency case', () => {
    expect(component.renderTimes).toBe(1);
    renderer.act(() => testStore.push('a'));
    expect(component.renderTimes).toBe(2);
    renderer.act(() => testStore.push('b'));
    expect(component.renderTimes).toBe(3);
    renderer.act(() => testStore.push('c'));
    expect(component.renderTimes).toBe(4);
    renderer.act(() => testStore.push('d'));
    renderer.act(() => testStore.push('e'));
    renderer.act(() => testStore.push('f'));
    renderer.act(() => testStore.push('g'));
    expect(component.renderTimes).toBe(4);
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class TestBaseProxyObject extends BaseProxyObject<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getProxyFromCache(key: any, originalValue: any) {
    return super.getProxyFromCache(key, originalValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createProxy(key: any, state: any) {
    return super.createProxy(key, state);
  }
}

test('Test BaseProxyObject getProxyFromCache', () => {
  const tb = new TestBaseProxyObject({
    displayName: 'TB',
    data: null,
    dispatch: null,
    collect: null,
  });
  expect(tb.getProxyFromCache('', 1)).toEqual({ proxy: 1, originalValue: 1 });
  expect(tb.getProxyFromCache('', 2)).toEqual({ proxy: 2, originalValue: 2 });
  expect(tb.getProxyFromCache('', 'test')).toEqual({ proxy: 'test', originalValue: 'test' });
});

test('Test BaseProxyObject createProxy', () => {
  const tb = new TestBaseProxyObject({
    displayName: 'TB',
    data: null,
    dispatch: null,
    collect: null,
  });
  expect(tb.createProxy('', 1)).toBe(1);
  expect(tb.createProxy('', 2)).toBe(2);
  const fn = () => ({});
  expect(tb.createProxy('', fn)).toBe(fn);
});
