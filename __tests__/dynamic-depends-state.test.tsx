import { Dynamic } from './__mocks__/dynamic-depends-state';
import { testStore } from './__mocks__/array-store';

import renderer from 'react-test-renderer';
import React from 'react';

describe('Test component will unmount', () => {
  let component: Dynamic;
  let componentRender: renderer.ReactTestRenderer;
  beforeEach(() => {
    testStore.init();
    componentRender = renderer.create(<Dynamic />);
    component = (componentRender.getInstance() as unknown) as Dynamic;
  });

  test('make connection', () => {
    expect(component.renderTimes).toBe(1);
    renderer.act(() => testStore.pop());
    expect(component.renderTimes).toBe(2);
    renderer.act(() => testStore.pop());
    expect(component.renderTimes).toBe(3);
    renderer.act(() => testStore.pop());
    expect(component.renderTimes).toBe(3);
  });
});
