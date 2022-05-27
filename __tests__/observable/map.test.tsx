import renderer from 'react-test-renderer';
import React from 'react';

import {
  MapContianer,
  MapContianerEntries,
  MapContianerForEach,
  MapContianerGetBasicValue,
  MapContianerHas,
  MapContianerKeys,
  MapContianerSymbolIterator,
  MapContianerValues,
} from '../__mocks__/map-component';

import { mapStore } from '../__mocks__/map-store';

describe('Test Map data type', () => {
  let componentRender: renderer.ReactTestRenderer;
  let component: MapContianer;
  afterEach(() => {
    componentRender?.unmount();
  });

  beforeEach(() => {
    renderer.act(() => mapStore.init());
  });

  test('set / clear /  size', () => {
    componentRender = renderer.create(<MapContianer />);
    component = (componentRender.getInstance() as unknown) as MapContianer;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    // set same basic type value for the same key;
    renderer.act(() => mapStore.set('b', '2'));
    // will not trigger re-render;
    expect(component.renderTimes).toBe(3);

    renderer.act(() => mapStore.clear());
    expect(component.renderTimes).toBe(4);
    renderer.act(() => mapStore.clear());
    expect(component.renderTimes).toBe(4);
  });

  test('delte / size', () => {
    componentRender = renderer.create(<MapContianer />);
    component = (componentRender.getInstance() as unknown) as MapContianer;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    // delete
    renderer.act(() => mapStore.delete('b'));
    expect(component.renderTimes).toBe(4);

    renderer.act(() => mapStore.delete('a'));
    expect(component.renderTimes).toBe(5);

    renderer.act(() => mapStore.delete('b'));
    expect(component.renderTimes).toBe(5);

    renderer.act(() => mapStore.delete('a'));
    expect(component.renderTimes).toBe(5);
  });

  test('get basic value', () => {
    componentRender = renderer.create(<MapContianerGetBasicValue />);
    component = (componentRender.getInstance() as unknown) as MapContianerGetBasicValue;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);

    // `b` is not collected
    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(2);

    renderer.act(() => mapStore.set('a', '2'));
    expect(component.renderTimes).toBe(3);

    renderer.act(() => mapStore.set('a', '2'));
    expect(component.renderTimes).toBe(3);
  });

  test('map has', () => {
    componentRender = renderer.create(<MapContianerHas />);
    component = (componentRender.getInstance() as unknown) as MapContianerHas;

    expect(component.renderTimes).toBe(1);
    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);

    // `b` is not collected
    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(2);

    renderer.act(() => mapStore.set('a', '2'));
    expect(component.renderTimes).toBe(3);

    renderer.act(() => mapStore.set('a', '2'));
    expect(component.renderTimes).toBe(3);
  });

  test('map keys', () => {
    componentRender = renderer.create(<MapContianerKeys />);
    component = (componentRender.getInstance() as unknown) as MapContianerKeys;

    expect(component.renderTimes).toBe(1);
    expect(mapStore.childrenRenderTimes).toBe(1);
    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    expect(mapStore.childrenRenderTimes).toBe(2);

    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    expect(mapStore.childrenRenderTimes).toBe(3);

    renderer.act(() => mapStore.set('b', '3'));
    expect(mapStore.childrenRenderTimes).toBe(4);
    renderer.act(() => mapStore.set('a', '0'));
    expect(mapStore.childrenRenderTimes).toBe(5);
    // not changes with keys
    expect(component.renderTimes).toBe(3);
  });

  test('map values', () => {
    componentRender = renderer.create(<MapContianerValues />);
    component = (componentRender.getInstance() as unknown) as MapContianerValues;

    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    expect(mapStore.childrenRenderTimes).toBe(2);

    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    expect(mapStore.childrenRenderTimes).toBe(3);

    renderer.act(() => mapStore.set('b', '3'));
    expect(mapStore.childrenRenderTimes).toBe(4);
    renderer.act(() => mapStore.set('a', '0'));
    expect(mapStore.childrenRenderTimes).toBe(5);
    expect(component.renderTimes).toBe(5);
    renderer.act(() => mapStore.set('a', '0'));
    // no update
    expect(mapStore.childrenRenderTimes).toBe(5);
    expect(component.renderTimes).toBe(5);

    // new key
    renderer.act(() => mapStore.set('c', 'c3'));
    expect(component.renderTimes).toBe(6);
    expect(mapStore.childrenRenderTimes).toBe(6);
  });

  test('map entries', () => {
    componentRender = renderer.create(<MapContianerEntries />);
    component = (componentRender.getInstance() as unknown) as MapContianerEntries;

    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    expect(mapStore.childrenRenderTimes).toBe(2);

    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    expect(mapStore.childrenRenderTimes).toBe(3);

    renderer.act(() => mapStore.set('b', '3'));
    expect(mapStore.childrenRenderTimes).toBe(4);
    renderer.act(() => mapStore.set('a', '0'));
    expect(mapStore.childrenRenderTimes).toBe(5);
    expect(component.renderTimes).toBe(5);

    renderer.act(() => mapStore.set('a', '0'));
    expect(component.renderTimes).toBe(5);
  });

  test('map forEach', () => {
    componentRender = renderer.create(<MapContianerForEach />);
    component = (componentRender.getInstance() as unknown) as MapContianerForEach;

    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    expect(mapStore.childrenRenderTimes).toBe(2);

    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    expect(mapStore.childrenRenderTimes).toBe(3);

    renderer.act(() => mapStore.set('b', '3'));
    expect(mapStore.childrenRenderTimes).toBe(4);
    renderer.act(() => mapStore.set('a', '0'));
    expect(component.renderTimes).toBe(5);
    expect(mapStore.childrenRenderTimes).toBe(5);

    renderer.act(() => mapStore.set('a', '0'));
    expect(component.renderTimes).toBe(5);
    expect(mapStore.childrenRenderTimes).toBe(5);
  });

  test('map Symbol.iterator', () => {
    componentRender = renderer.create(<MapContianerSymbolIterator />);
    component = (componentRender.getInstance() as unknown) as MapContianerSymbolIterator;

    renderer.act(() => mapStore.set('a', '1'));
    expect(component.renderTimes).toBe(2);
    expect(mapStore.childrenRenderTimes).toBe(2);

    renderer.act(() => mapStore.set('b', '2'));
    expect(component.renderTimes).toBe(3);
    expect(mapStore.childrenRenderTimes).toBe(3);

    renderer.act(() => mapStore.set('b', '3'));
    expect(mapStore.childrenRenderTimes).toBe(4);
    renderer.act(() => mapStore.set('a', '0'));
    expect(mapStore.childrenRenderTimes).toBe(5);
    expect(component.renderTimes).toBe(5);

    renderer.act(() => mapStore.set('a', '0'));
    expect(component.renderTimes).toBe(5);
  });

  test('map initial value', () => {
    componentRender = renderer.create(<MapContianerKeys />);
    component = (componentRender.getInstance() as unknown) as MapContianerKeys;

    expect(component.renderTimes).toBe(1);
    expect(mapStore.childrenRenderTimes).toBe(1);

    renderer.act(() => mapStore.set('initKey1', 'foo'));
    expect(component.renderTimes).toBe(1);
    expect(mapStore.childrenRenderTimes).toBe(2);
  });

  test('map Symbol.toStringTag', () => {
    expect(mapStore.data[Symbol.toStringTag]).toBe('Map');
  });
});
