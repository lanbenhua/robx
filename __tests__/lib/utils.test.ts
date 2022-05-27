/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isSupportedNonBaseType,
  shadowCompareObject,
  shadowCompare,
  getValueType,
  isBaseType,
} from '../../src/lib/utils';

test('getValueType: 3 to be Number, isBaseType', () => {
  const type = getValueType(3);
  expect(type).toBe('Number');
  expect(isBaseType(type)).toBe(true);
});

test('getValueType: "3" to be String, isBaseType', () => {
  const type = getValueType('3');
  expect(type).toBe('String');
  expect(isBaseType(type)).toBe(true);
});

test('getValueType: undefined to be Undefined, isBaseType', () => {
  const type = getValueType(undefined);
  expect(type).toBe('Undefined');
  expect(isBaseType(type)).toBe(true);
});

test('getValueType: null to be Null, isBaseType', () => {
  const type = getValueType(null);
  expect(type).toBe('Null');
  expect(isBaseType(type)).toBe(true);
});

test('getValueType: false/true to be Boolean, isBaseType', () => {
  const typeTrue = getValueType(true);
  expect(typeTrue).toBe('Boolean');
  expect(isBaseType(typeTrue)).toBe(true);

  const typeFalse = getValueType(false);
  expect(typeFalse).toBe('Boolean');
  expect(isBaseType(typeFalse)).toBe(true);
});

test('getValueType: {} to be Object, is not BaseType', () => {
  const type = getValueType({});
  expect(type).toBe('Object');
  expect(isBaseType(type)).toBe(false);
});

test('getValueType: [] to be Array, is not BaseType', () => {
  const type = getValueType([]);
  expect(type).toBe('Array');
  expect(isBaseType(type)).toBe(false);
});

test('getValueType: Set to be Set, is not BaseType', () => {
  const type = getValueType(new Set());
  expect(type).toBe('Set');
  expect(isBaseType(type)).toBe(false);
});

test('getValueType: Map to be Map, is not BaseType', () => {
  const type = getValueType(new Map());
  expect(type).toBe('Map');
  expect(isBaseType(type)).toBe(false);
});

test('getValueType: function to be Function, is not BaseType', () => {
  const type = getValueType(() => 1);
  expect(type).toBe('Function');
  expect(isBaseType(type)).toBe(false);
});

test('shadowCompare', () => {
  const obj = {};
  const array: any[] = [];
  expect(shadowCompare(true, true)).toBe(true);
  expect(shadowCompare(false, true)).toBe(false);
  expect(shadowCompare(undefined, undefined)).toBe(true);
  expect(shadowCompare(null, null)).toBe(true);
  expect(shadowCompare(undefined, null)).toBe(false);
  expect(shadowCompare(undefined, false)).toBe(false);
  expect(shadowCompare([], [])).toBe(false);
  expect(shadowCompare(array, [])).toBe(false);
  expect(shadowCompare(array, array)).toBe(true);
  expect(shadowCompare({}, [])).toBe(false);
  expect(shadowCompare({}, {})).toBe(false);
  expect(shadowCompare({}, obj)).toBe(false);
  expect(shadowCompare(obj, obj)).toBe(true);
});

test('shadowCompareObject', () => {
  const oldValue: any = {};
  const newValue: any = {};
  expect(shadowCompareObject(oldValue, newValue)).toBe(true);
  const subProp = {};
  oldValue.subProp = subProp;
  expect(shadowCompareObject(oldValue, newValue)).toBe(false);
  newValue.subProp = {};
  expect(shadowCompareObject(oldValue, newValue)).toBe(false);

  newValue.subProp = subProp;
  expect(shadowCompareObject(oldValue, newValue)).toBe(true);
  newValue.moreProp = 'test';
  expect(shadowCompareObject(oldValue, newValue)).toBe(false);
  expect(shadowCompareObject(1, 2)).toBe(false);

  expect(shadowCompareObject(1, 1)).toBe(true);
  expect(shadowCompareObject(1, {})).toBe(false);

  expect(shadowCompareObject(new Map(), new Map())).toBe(false);
  expect(shadowCompareObject(new Set(), new Set())).toBe(false);
});

test('isSupportedNonBaseType', () => {
  const array = getValueType([]);
  const obj = getValueType({});
  const set = getValueType(new Set());
  const map = getValueType(new Map());

  const baseTypeNull = getValueType(null);
  const baseTypeNum = getValueType(null);
  const baseTypeStr = getValueType(null);
  const baseTypeBool = getValueType(null);
  const baseTypeUndefined = getValueType(null);

  expect(isSupportedNonBaseType(array)).toBe(true);
  expect(isSupportedNonBaseType(obj)).toBe(true);
  expect(isSupportedNonBaseType(set)).toBe(true);
  expect(isSupportedNonBaseType(map)).toBe(true);

  expect(isSupportedNonBaseType(baseTypeBool)).toBe(false);
  expect(isSupportedNonBaseType(baseTypeNum)).toBe(false);
  expect(isSupportedNonBaseType(baseTypeNull)).toBe(false);
  expect(isSupportedNonBaseType(baseTypeStr)).toBe(false);
  expect(isSupportedNonBaseType(baseTypeUndefined)).toBe(false);
});
