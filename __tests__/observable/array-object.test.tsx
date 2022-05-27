/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TestObjectArrayContainerChildrenWrappedByObserver,
  TestObjectArrayContainerChildrenWithoutObserver,
} from '../__mocks__/array-test-component';

import { testStore } from '../__mocks__/array-store';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Array Object Type', () => {
  let childrenWrappedbyObsever: TestObjectArrayContainerChildrenWrappedByObserver;
  let childrenWithoutObserver: TestObjectArrayContainerChildrenWithoutObserver;
  beforeEach(() => {
    renderer.act(() => testStore.init());
    childrenWrappedbyObsever = (renderer
      .create(<TestObjectArrayContainerChildrenWrappedByObserver />)
      .getInstance() as unknown) as TestObjectArrayContainerChildrenWrappedByObserver;
    childrenWithoutObserver = (renderer
      .create(<TestObjectArrayContainerChildrenWithoutObserver />)
      .getInstance() as unknown) as TestObjectArrayContainerChildrenWithoutObserver;
  });

  test('Test array push', () => {
    expect(childrenWrappedbyObsever.renderTimes).toBe(1);
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(2);
    expect(childrenWithoutObserver.renderTimes).toBe(1);
    expect(childrenWithoutObserver.personRenderTimes).toBe(2);
    renderer.act(() => {
      testStore.pushPerson({ age: 30, name: 'sea' });
    });
    expect(childrenWrappedbyObsever.renderTimes).toBe(2);
    // push a new item will only trigger children components re-render once more
    // 2 + 1 = 3
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(3);
    expect(childrenWithoutObserver.renderTimes).toBe(2);
    // push a new item will only trigger all children components re-render once more
    // 2 + testStore.persons.length (3) = 5
    expect(childrenWithoutObserver.personRenderTimes).toBe(5);
    renderer.act(() => {
      testStore.pushPerson({ age: 29, name: 'shopee' });
    });
    expect(childrenWrappedbyObsever.renderTimes).toBe(3);
    // push a new item will only trigger children components re-render once more
    // 3 + 1 = 4
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(4);
    expect(childrenWithoutObserver.renderTimes).toBe(3);
    // push a new item will only trigger all children components re-render once more
    // 5 + testStore.persons.length (4) = 9
    expect(childrenWithoutObserver.personRenderTimes).toBe(9);
  });

  test('Test update array item', () => {
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(2);
    expect(childrenWithoutObserver.personRenderTimes).toBe(2);
    renderer.act(() => testStore.updatePersonAge(0, 30));
    expect(childrenWrappedbyObsever.renderTimes).toBe(1);
    // 2 + 1;
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(3);
    // child is not updated yet
    expect(childrenWithoutObserver.personRenderTimes).toBe(2);
  });

  test('Test pop array item', () => {
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(2);
    expect(childrenWithoutObserver.personRenderTimes).toBe(2);
    renderer.act(() => {
      testStore.pushPerson({ age: 30, name: 'sea' });
    });
    expect(childrenWrappedbyObsever.renderTimes).toBe(2);
    // 2 + 1;
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(3);
    // push a new item will only trigger all children components re-render once more
    // 2 + testStore.persons.length (3) = 5
    expect(childrenWithoutObserver.personRenderTimes).toBe(5);
    renderer.act(() => testStore.popPerson());
    expect(childrenWrappedbyObsever.renderTimes).toBe(3);
    expect(childrenWithoutObserver.renderTimes).toBe(3);

    // 3 + 0 = 3
    expect(childrenWrappedbyObsever.personRenderTimes).toBe(3);
    // 5 + testStore.persons.length (2) = 7
    expect(childrenWithoutObserver.personRenderTimes).toBe(7);
  });
});
