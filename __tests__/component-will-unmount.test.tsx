import React from 'react';

import {
  TestChildrenClassComponentsWithUnmount,
  TestChildrenClassComponentsWithoutUnmount,
} from './__mocks__/component-lifecycle-event';

import { testStore } from './__mocks__/array-store';
import renderer from 'react-test-renderer';

describe('Test component will unmount', () => {
  let componentWithUnmout: TestChildrenClassComponentsWithUnmount;
  let componentWithUnmoutRender: renderer.ReactTestRenderer;
  let componentWithoutUnmout: TestChildrenClassComponentsWithoutUnmount;
  let componentWithoutUnmoutRender: renderer.ReactTestRenderer;

  afterEach(() => {
    componentWithUnmoutRender?.unmount();
    componentWithoutUnmoutRender?.unmount();
  });

  beforeEach(() => {
    testStore.init();
  });

  test('children component will unmount ', () => {
    componentWithUnmoutRender = renderer.create(<TestChildrenClassComponentsWithUnmount />);

    componentWithUnmout = (componentWithUnmoutRender.getInstance() as unknown) as TestChildrenClassComponentsWithUnmount;

    expect(componentWithUnmout.renderTimes).toBe(1);
    expect(testStore.personProfileTimes).toBe(2);

    renderer.act(() => testStore.unshiftPerson({ age: 20, name: 'Sea' }));
    expect(componentWithUnmout.renderTimes).toBe(2);
    expect(testStore.personProfileTimes).toBe(3);

    renderer.act(() => testStore.unshiftPerson({ age: 20, name: 'Shopee' }));
    expect(componentWithUnmout.renderTimes).toBe(3);
    expect(testStore.personProfileTimes).toBe(4);

    // unmount
    renderer.act(() => testStore.shiftPerson());
    expect(componentWithUnmout.renderTimes).toBe(4);
    expect(testStore.unmountedTimes).toBe(1);
    expect(testStore.personProfileTimes).toBe(4);

    // unmount
    renderer.act(() => testStore.shiftPerson());
    expect(componentWithUnmout.renderTimes).toBe(5);
    expect(testStore.unmountedTimes).toBe(2);
    expect(testStore.personProfileTimes).toBe(4);
  });

  test('children component has no unmount ', () => {
    componentWithoutUnmoutRender = renderer.create(<TestChildrenClassComponentsWithoutUnmount />);
    componentWithoutUnmout = (componentWithoutUnmoutRender.getInstance() as unknown) as TestChildrenClassComponentsWithoutUnmount;

    expect(componentWithoutUnmout.renderTimes).toBe(1);
    expect(testStore.personProfileTimes).toBe(2);

    renderer.act(() => testStore.unshiftPerson({ age: 20, name: 'Sea' }));
    expect(componentWithoutUnmout.renderTimes).toBe(2);
    expect(testStore.personProfileTimes).toBe(3);

    renderer.act(() => testStore.unshiftPerson({ age: 20, name: 'Shopee' }));
    expect(componentWithoutUnmout.renderTimes).toBe(3);
    expect(testStore.personProfileTimes).toBe(4);

    // unmount
    renderer.act(() => testStore.shiftPerson());
    expect(componentWithoutUnmout.renderTimes).toBe(4);
    expect(testStore.unmountedTimes).toBe(0);
    expect(testStore.personProfileTimes).toBe(4);

    // unmount
    renderer.act(() => testStore.shiftPerson());
    expect(componentWithoutUnmout.renderTimes).toBe(5);
    expect(testStore.unmountedTimes).toBe(0);
    expect(testStore.personProfileTimes).toBe(4);
  });
});
