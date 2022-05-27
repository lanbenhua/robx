/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TestObjectArrayContainerIndexKey,
  TestObjectArrayContainerIdKey,
} from '../__mocks__/array-children-key-component';

import { testStore } from '../__mocks__/array-store';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Array Object Type', () => {
  let indexKey: TestObjectArrayContainerIndexKey;
  let idKey: TestObjectArrayContainerIdKey;

  beforeEach(() => {
    renderer.act(() => testStore.init());
    indexKey = (renderer
      .create(<TestObjectArrayContainerIndexKey />)
      .getInstance() as unknown) as TestObjectArrayContainerIndexKey;
    idKey = (renderer
      .create(<TestObjectArrayContainerIdKey />)
      .getInstance() as unknown) as TestObjectArrayContainerIdKey;
  });

  test('Test push persons', () => {
    expect(indexKey.renderTimes).toBe(1);
    expect(indexKey.personRenderTimes).toBe(2);
    expect(idKey.renderTimes).toBe(1);
    expect(idKey.personRenderTimes).toBe(2);
    renderer.act(() => testStore.pushPerson({ age: 30, name: 'Sea' }));

    expect(indexKey.renderTimes).toBe(2);
    // 2 + 1;
    expect(indexKey.personRenderTimes).toBe(3);

    expect(idKey.renderTimes).toBe(2);
    // 2 + 1;
    expect(idKey.personRenderTimes).toBe(3);
  });

  test('Test unshift persons', () => {
    expect(indexKey.renderTimes).toBe(1);
    expect(indexKey.personRenderTimes).toBe(2);
    expect(idKey.renderTimes).toBe(1);
    expect(idKey.personRenderTimes).toBe(2);
    renderer.act(() => testStore.unshiftPerson({ age: 30, name: 'Sea' }));

    expect(indexKey.renderTimes).toBe(2);
    // 2 + 3;
    expect(indexKey.personRenderTimes).toBe(5);

    expect(idKey.renderTimes).toBe(2);
    // 2 + 1;
    expect(idKey.personRenderTimes).toBe(3);

    renderer.act(() => testStore.unshiftPerson({ age: 29, name: 'shopee' }));

    expect(indexKey.renderTimes).toBe(3);
    // 5 + 4;
    expect(indexKey.personRenderTimes).toBe(9);

    expect(idKey.renderTimes).toBe(3);
    // 3 + 1;
    expect(idKey.personRenderTimes).toBe(4);
  });
});
