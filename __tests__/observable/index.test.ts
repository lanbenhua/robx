import { TestObservable } from '../__mocks__/observable-store';

describe('observable', () => {
  let testObservable: TestObservable;
  beforeEach(() => {
    testObservable = new TestObservable();
  });

  test('observable init', () => {
    expect(testObservable.name).toBe('jack');
    expect(testObservable.info.team).toBe('Big Data');
  });

  test('observable change base type', () => {
    expect(testObservable.name).toBe('jack');
    testObservable.changeName('lucy');
    expect(testObservable.name).toBe('lucy');
  });

  test('observable change object type', () => {
    expect(testObservable.info.team).toBe('Big Data');
    testObservable.transferTo('data science');
    expect(testObservable.info.team).toBe('data science');
  });

  test('observable change deep object type', () => {
    expect(testObservable.info.permisson.write).toBe(true);
    expect(testObservable.info.permisson.read).toBe(true);
    testObservable.changePermission(false, false);
    expect(testObservable.info.permisson.write).toBe(false);
    expect(testObservable.info.permisson.read).toBe(false);
  });

  test('observable change object', () => {
    expect(testObservable.info.permisson.write).toBe(true);
    expect(testObservable.info.permisson.read).toBe(true);
    testObservable.changePermissionObject({ read: false, write: false });
    expect(testObservable.info.permisson.write).toBe(false);
    expect(testObservable.info.permisson.read).toBe(false);
  });
});
