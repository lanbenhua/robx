/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestContainer, TestContainer2, TestContainer3 } from '../__mocks__/array-test-component';
import { testStore } from '../__mocks__/array-store';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Array Basic Type', () => {
  let testContainer1: TestContainer;
  let testContainer2: TestContainer2;
  let testContainer3: TestContainer3;
  beforeEach(() => {
    renderer.act(() => testStore.init());
    testContainer1 = (renderer.create(<TestContainer />).getInstance() as unknown) as TestContainer;
    testContainer2 = (renderer
      .create(<TestContainer2 />)
      .getInstance() as unknown) as TestContainer2;

    testContainer3 = (renderer
      .create(<TestContainer3 />)
      .getInstance() as unknown) as TestContainer3;
  });

  test('test render', (done) => {
    expect(testContainer1.renderTimes).toBe(1);
    testContainer1.forceUpdate(() => {
      expect(testContainer1.renderTimes).toBe(2);
      done();
    });
  });

  test('test array push', () => {
    testStore.push('pear');
    expect(testContainer1.renderTimes).toBe(2);
    expect(testStore.fruits.length).toBe(4);
    testStore.push('peach');
    expect(testContainer1.renderTimes).toBe(3);
    expect(testStore.fruits.length).toBe(5);
  });

  test('test array batch push', () => {
    testStore.batchPush();
    expect(testContainer1.renderTimes).toBe(2);
    expect(testStore.fruits.length).toBe(6);
  });

  test('test array pop', () => {
    testStore.popTwice();
    expect(testContainer1.renderTimes).toBe(2);
    expect(testStore.fruits.length).toBe(1);
    expect(testContainer3.renderTimes).toBe(1);
  });

  test('test array delete', () => {
    testStore.delete(0);
    expect(testContainer1.renderTimes).toBe(2);
    expect(testStore.fruits).toEqual(['banana', 'orange']);
    testStore.delete(1);
    expect(testContainer1.renderTimes).toBe(3);
    expect(testStore.fruits).toEqual(['banana']);

    testStore.delete(0);
    expect(testContainer1.renderTimes).toBe(4);
    expect(testStore.fruits).toEqual([]);

    testStore.delete(0);
    testStore.delete(0);
    testStore.delete(0);
    testStore.delete(0);
    expect(testContainer1.renderTimes).toBe(4);
    expect(testStore.fruits).toEqual([]);
    expect(testContainer3.renderTimes).toBe(1);
  });

  test('update array items', () => {
    testStore.update(0, 'watermelon');
    expect(testContainer1.renderTimes).toBe(1);
    expect(testContainer2.renderTimes).toBe(2);
    expect(testStore.fruits[0]).toBe('watermelon');
    testStore.update(1, 'apple');
    expect(testContainer1.renderTimes).toBe(1);
    expect(testContainer2.renderTimes).toBe(3);
    expect(testStore.fruits[1]).toBe('apple');
    testStore.update(2, 'banana');
    expect(testContainer1.renderTimes).toBe(1);
    expect(testContainer2.renderTimes).toBe(4);
    expect(testStore.fruits[2]).toBe('banana');
    expect(testContainer3.renderTimes).toBe(1);
  });

  test('update array out of bounders', () => {
    expect(testStore.fruits[3]).toBeUndefined();
    testStore.update(3, 'orange');
    expect(testContainer1.renderTimes).toBe(2);
    expect(testContainer2.renderTimes).toBe(2);
    expect(testContainer3.renderTimes).toBe(1);
    expect(testStore.fruits[3]).toBe('orange');
    testStore.update(4, 'orange');
    expect(testContainer1.renderTimes).toBe(3);
    expect(testContainer2.renderTimes).toBe(3);
    expect(testContainer3.renderTimes).toBe(1);
  });

  test('update same value', () => {
    expect(testStore.fruits[3]).toBeUndefined();
    testStore.update(3, 'orange');
    expect(testStore.fruits[3]).toBe('orange');
    expect(testContainer1.renderTimes).toBe(2);
    expect(testContainer2.renderTimes).toBe(2);
    expect(testContainer3.renderTimes).toBe(1);

    testStore.update(3, 'orange'); // the same basic type value
    testStore.update(3, 'orange'); // the same basic type value
    testStore.update(3, 'orange'); // the same basic type value
    testStore.update(3, 'orange'); // the same basic type value
    expect(testStore.fruits[3]).toBe('orange');
    expect(testContainer1.renderTimes).toBe(2);
    expect(testContainer2.renderTimes).toBe(2);
    expect(testContainer3.renderTimes).toBe(1);
  });

  test('assign new array to fruits', () => {
    expect(testContainer3.renderTimes).toBe(1);
    testStore.setNewFruit(); // +1
    testStore.setNewFruit(); // +1
    testStore.setNewFruit(); // +1
    expect(testStore.fruits).toEqual(testStore.newFruits);
    expect(testContainer2.renderTimes).toBe(4);
    expect(testContainer3.renderTimes).toBe(4);
  });

  test('assign the same array to fruits', () => {
    testStore.setNewFruitWithSameRef();
    expect(testContainer2.renderTimes).toBe(2);
    testStore.setNewFruitWithSameRef(); // +1
    testStore.setNewFruitWithSameRef(); // +1
    testStore.setNewFruitWithSameRef(); // +1
    expect(testStore.fruits).toEqual(testStore.newFruits);
    expect(testContainer2.renderTimes).toBe(5);
    expect(testContainer2.renderTimes).toBe(5);
  });
});
