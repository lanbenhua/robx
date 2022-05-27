import { mocked } from 'ts-jest/dist/utils/testing';
import { action, computed, observable, observer } from '../src';

mocked('react');

test('action is a function', () => {
  expect(typeof action).toBe('function');
});

test('action.bound is a function', () => {
  expect(typeof action).toBe('function');
});

test('computed is a function', () => {
  expect(typeof computed).toBe('function');
});

test('observable is a function', () => {
  expect(typeof observable).toBe('function');
});

test('observer is a function', () => {
  expect(typeof observer).toBe('function');
});
