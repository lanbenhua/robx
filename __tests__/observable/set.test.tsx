import renderer from 'react-test-renderer';
import React from 'react';

import {
  SetContianerHasObject,
  SetContianerHas,
  SetContianer,
  SetContianerKeys,
  SetContianerValues,
  SetContianerForEach,
  SetContianerEntries,
  SetContianerSymbolIterator,
} from '../__mocks__/set-component';

import { setStore } from '../__mocks__/set-store';

describe('Test Set data type', () => {
  let componentRender: renderer.ReactTestRenderer;
  let component: SetContianer;
  afterEach(() => {
    componentRender?.unmount();
  });

  beforeEach(() => {
    renderer.act(() => setStore.init());
  });

  test('add / clear /  size', () => {
    componentRender = renderer.create(<SetContianer />);
    component = (componentRender.getInstance() as unknown) as SetContianer;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => setStore.add('a'));
    expect(component.renderTimes).toBe(2);
    renderer.act(() => setStore.add('b'));
    expect(component.renderTimes).toBe(3);
    renderer.act(() => setStore.add('b'));
    // will not trigger re-render;
    expect(component.renderTimes).toBe(3);

    renderer.act(() => setStore.clear());
    expect(component.renderTimes).toBe(4);
    renderer.act(() => setStore.clear());
    expect(component.renderTimes).toBe(4);
  });

  test('delte / size', () => {
    componentRender = renderer.create(<SetContianer />);
    component = (componentRender.getInstance() as unknown) as SetContianer;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => setStore.add('a'));
    expect(component.renderTimes).toBe(2);
    renderer.act(() => setStore.add('b'));
    expect(component.renderTimes).toBe(3);
    // delete
    renderer.act(() => setStore.delete('b'));
    expect(component.renderTimes).toBe(4);

    renderer.act(() => setStore.delete('a'));
    expect(component.renderTimes).toBe(5);

    renderer.act(() => setStore.delete('b'));
    expect(component.renderTimes).toBe(5);

    renderer.act(() => setStore.delete('a'));
    expect(component.renderTimes).toBe(5);

    renderer.act(() => setStore.delete('c'));
    expect(component.renderTimes).toBe(5);

    renderer.act(() => setStore.delete({ notExist: 'test' }));
    expect(component.renderTimes).toBe(5);
  });

  test('set has basic type value', () => {
    componentRender = renderer.create(<SetContianerHas />);
    component = (componentRender.getInstance() as unknown) as SetContianerHas;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => setStore.add('a'));
    expect(component.renderTimes).toBe(2);

    // `b` is not collected
    renderer.act(() => setStore.add('b'));
    expect(component.renderTimes).toBe(2);

    renderer.act(() => setStore.add('a'));
    expect(component.renderTimes).toBe(2);
  });

  test('set has object type value', () => {
    componentRender = renderer.create(<SetContianerHasObject />);
    component = (componentRender.getInstance() as unknown) as SetContianerHasObject;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => setStore.addObject());
    expect(component.renderTimes).toBe(2);

    // `b` is not collected
    renderer.act(() => setStore.addObject());
    expect(component.renderTimes).toBe(3);

    renderer.act(() => setStore.addObject());
    expect(component.renderTimes).toBe(4);
  });

  test('set keys', () => {
    componentRender = renderer.create(<SetContianerKeys />);
    component = (componentRender.getInstance() as unknown) as SetContianerKeys;

    expect(component.renderTimes).toBe(1);
    expect(setStore.childrenRenderTimes).toBe(1);
    renderer.act(() => setStore.add('a'));
    expect(component.renderTimes).toBe(2);
    expect(setStore.childrenRenderTimes).toBe(2);

    renderer.act(() => setStore.add('b'));
    expect(component.renderTimes).toBe(3);
    expect(setStore.childrenRenderTimes).toBe(3);

    renderer.act(() => setStore.add('b'));
    expect(setStore.childrenRenderTimes).toBe(3);
    renderer.act(() => setStore.add('a'));
    expect(setStore.childrenRenderTimes).toBe(3);
    // not changes with keys
    expect(component.renderTimes).toBe(3);
  });

  test('object', () => {
    componentRender = renderer.create(<SetContianerKeys />);
    component = (componentRender.getInstance() as unknown) as SetContianerKeys;

    // add object
    renderer.act(() => setStore.addObject());
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(2);

    // add same object
    // this a very special case
    // children collect `data`
    renderer.act(() => setStore.addObject());
    expect(setStore.childrenRenderTimes).toBe(3);
    expect(component.renderTimes).toBe(3);

    // delete object
    renderer.act(() => setStore.deleteObject());
    expect(setStore.childrenRenderTimes).toBe(3);
    expect(component.renderTimes).toBe(4);

    // add object again
    renderer.act(() => setStore.addObject());
    expect(setStore.childrenRenderTimes).toBe(4);
    expect(component.renderTimes).toBe(5);
  });

  test('object values', () => {
    componentRender = renderer.create(<SetContianerValues />);
    component = (componentRender.getInstance() as unknown) as SetContianerValues;

    // add object
    renderer.act(() => setStore.addObjectData());
    expect(setStore.childrenRenderTimes).toBe(1);
    expect(component.renderTimes).toBe(2);

    // add same object
    renderer.act(() => setStore.addObjectData());
    expect(setStore.childrenRenderTimes).toBe(1);
    expect(component.renderTimes).toBe(3);

    // delete object
    renderer.act(() => setStore.deleteObjectData());
    expect(setStore.childrenRenderTimes).toBe(1);
    expect(component.renderTimes).toBe(4);

    // add object again
    renderer.act(() => setStore.addObjectData());
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(5);
  });

  test('object values', () => {
    componentRender = renderer.create(<SetContianerValues />);
    component = (componentRender.getInstance() as unknown) as SetContianerValues;

    // add object
    renderer.act(() => setStore.updateObjectData('notExist', 'test'));
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(1);

    // add same object
    renderer.act(() => setStore.updateObjectData('notExist', 'test2'));
    expect(setStore.childrenRenderTimes).toBe(3);
    expect(component.renderTimes).toBe(1);
  });

  test('set forEach', () => {
    componentRender = renderer.create(<SetContianerForEach />);
    component = (componentRender.getInstance() as unknown) as SetContianerForEach;

    renderer.act(() => setStore.add('a'));
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(2);

    renderer.act(() => setStore.add('initKey1'));
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(2);
  });

  test('set entries', () => {
    componentRender = renderer.create(<SetContianerEntries />);
    component = (componentRender.getInstance() as unknown) as SetContianerEntries;

    // update object
    renderer.act(() => setStore.updateObjectData('notExist', 'test'));
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(1);

    // update same object
    renderer.act(() => setStore.updateObjectData('notExist', 'test2'));
    expect(setStore.childrenRenderTimes).toBe(3);
    expect(component.renderTimes).toBe(1);
  });

  test('set Symbol.iterator', () => {
    componentRender = renderer.create(<SetContianerSymbolIterator />);
    component = (componentRender.getInstance() as unknown) as SetContianerSymbolIterator;

    // update object
    renderer.act(() => setStore.updateObjectData('notExist', 'test'));
    expect(setStore.childrenRenderTimes).toBe(2);
    expect(component.renderTimes).toBe(1);

    // update same object
    renderer.act(() => setStore.updateObjectData('notExist', 'test2'));
    expect(setStore.childrenRenderTimes).toBe(3);
    expect(component.renderTimes).toBe(1);
  });

  test('set Symbol.toStringTag', () => {
    expect(setStore.data[Symbol.toStringTag]).toBe('Set');
  });

  test('getOriginalValue add observable data', () => {
    console.error = jest.fn();
    renderer.act(() => setStore.addObservableData());
    expect(console.error).toHaveBeenCalled();
  });
});
