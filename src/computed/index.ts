import { computedDecorator } from './computed-reaction';

export const computed = (_: unknown, propertyKey: PropertyKey, descriptor: PropertyDescriptor) => {
  return computedDecorator(propertyKey, descriptor);
};

export const onlyComputed = (
  _: unknown,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
) => {
  return computedDecorator(propertyKey, descriptor, true);
};
