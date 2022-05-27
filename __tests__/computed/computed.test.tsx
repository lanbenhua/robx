/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TestIdKeyArrayFindPersonProfile,
  TestIdKeyOnlyComputedMapFindPersonProfile,
  TestIdKeyComputedMapFindPersonProfile,
} from '../__mocks__/array-children-key-component';

import { testStore } from '../__mocks__/array-store';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Array Object Type Computed', () => {
  let findPersionFromArray: TestIdKeyArrayFindPersonProfile;
  let findPersionFromOnlyComputedMap: TestIdKeyOnlyComputedMapFindPersonProfile;
  let findPersionFromComputedMap: TestIdKeyComputedMapFindPersonProfile;
  beforeEach(() => {
    renderer.act(() => testStore.init());
    findPersionFromArray = (renderer
      .create(<TestIdKeyArrayFindPersonProfile />)
      .getInstance() as unknown) as TestIdKeyArrayFindPersonProfile;
    findPersionFromOnlyComputedMap = (renderer
      .create(<TestIdKeyOnlyComputedMapFindPersonProfile />)
      .getInstance() as unknown) as TestIdKeyOnlyComputedMapFindPersonProfile;
    findPersionFromComputedMap = (renderer
      .create(<TestIdKeyComputedMapFindPersonProfile />)
      .getInstance() as unknown) as TestIdKeyOnlyComputedMapFindPersonProfile;
  });

  test('Test unshift persons array vs onlyComputed', () => {
    expect(findPersionFromArray.renderTimes).toBe(1);
    expect(findPersionFromArray.personRenderTimes).toBe(2);
    expect(findPersionFromOnlyComputedMap.renderTimes).toBe(1);
    expect(findPersionFromOnlyComputedMap.personRenderTimes).toBe(2);

    renderer.act(() => testStore.unshiftPerson({ age: 30, name: 'Sea' }));

    expect(findPersionFromArray.renderTimes).toBe(2);
    // 2 + 3(testStore.persons.length) = 5;
    expect(findPersionFromArray.personRenderTimes).toBe(5);

    expect(findPersionFromOnlyComputedMap.renderTimes).toBe(2);
    // 2 + 1;
    expect(findPersionFromOnlyComputedMap.personRenderTimes).toBe(3);

    renderer.act(() => testStore.unshiftPerson({ age: 29, name: 'shopee' }));

    expect(findPersionFromArray.renderTimes).toBe(3);
    // 5 + 4(testStore.persons.length) = 9;
    expect(findPersionFromArray.personRenderTimes).toBe(9);

    expect(findPersionFromOnlyComputedMap.renderTimes).toBe(3);
    // 3 + 1;
    expect(findPersionFromOnlyComputedMap.personRenderTimes).toBe(4);
  });

  test('Test unshift persons computed vs onlyComputed', () => {
    expect(findPersionFromComputedMap.renderTimes).toBe(1);
    expect(findPersionFromComputedMap.personRenderTimes).toBe(2);
    expect(findPersionFromOnlyComputedMap.renderTimes).toBe(1);
    expect(findPersionFromOnlyComputedMap.personRenderTimes).toBe(2);

    renderer.act(() => testStore.unshiftPerson({ age: 30, name: 'Sea' }));

    expect(findPersionFromComputedMap.renderTimes).toBe(2);
    // 2 + 3(testStore.persons.length) = 5;
    expect(findPersionFromComputedMap.personRenderTimes).toBe(5);

    expect(findPersionFromOnlyComputedMap.renderTimes).toBe(2);
    // 2 + 1;
    expect(findPersionFromOnlyComputedMap.personRenderTimes).toBe(3);

    renderer.act(() => testStore.unshiftPerson({ age: 29, name: 'shopee' }));

    expect(findPersionFromComputedMap.renderTimes).toBe(3);
    // 5 + 4(testStore.persons.length) = 9;
    expect(findPersionFromComputedMap.personRenderTimes).toBe(9);

    expect(findPersionFromOnlyComputedMap.renderTimes).toBe(3);
    // 3 + 1;
    expect(findPersionFromOnlyComputedMap.personRenderTimes).toBe(4);
  });
});
