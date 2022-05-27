import React from 'react';

import { TestClassComponentShouldComponentUpdate } from './__mocks__/component-lifecycle-event';
import { testStore } from './__mocks__/array-store';
import renderer from 'react-test-renderer';

describe('Test should component update for class component', () => {
  let component: TestClassComponentShouldComponentUpdate;
  let componentRender: renderer.ReactTestRenderer;
  beforeEach(() => {
    testStore.init();
    // mock console.error;
    console.error = jest.fn();

    componentRender = renderer.create(<TestClassComponentShouldComponentUpdate />);
    component = (componentRender.getInstance() as unknown) as TestClassComponentShouldComponentUpdate;
  });

  afterEach(() => {
    componentRender.unmount();
  });

  test('should component update ', () => {
    expect(component.renderTimes).toBe(1);
    expect(testStore.personProfileTimes).toBe(2);
    renderer.act(() => testStore.unshiftPerson({ age: 20, name: 'Sea' }));
    // console.error
    expect(console.error).toHaveBeenCalled();
    expect(component.renderTimes).toBe(2);
    // 2 + 1 = 3;
    expect(testStore.personProfileTimes).toBe(3);
    renderer.act(() => testStore.unshiftPerson({ age: 20, name: 'Shopee' }));
    // console.error
    expect(console.error).toHaveBeenCalled();
    expect(component.renderTimes).toBe(3);
    // 3 + 1 =  4;
    expect(testStore.personProfileTimes).toBe(4);
  });

  test('should component update setState', () => {
    expect(component.renderTimes).toBe(1);
    expect(testStore.personProfileTimes).toBe(2);
    renderer.act(() => component.setState({}));
    expect(component.renderTimes).toBe(2);
    expect(testStore.personProfileTimes).toBe(2);
  });
});
