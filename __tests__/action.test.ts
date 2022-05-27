import { TestAction, TestActionNonFunction } from './__mocks__/action-store';

describe('action', () => {
  let testAction: TestAction;
  beforeEach(() => {
    testAction = new TestAction();
  });

  test('Action decorator', () => {
    expect(testAction.name).toBe('jack');
    testAction.changeName('lucy');
    expect(testAction.name).toBe('lucy');
  });

  test('Action decorator arrow function', () => {
    expect(testAction.name).toBe('jack');
    testAction.changeNameWithActionArrowFunc('lucy');
    expect(testAction.name).toBe('lucy');

    const actionArrow = testAction.changeNameWithActionArrowFunc;
    actionArrow('james');
    expect(testAction.name).toBe('james');

    const actionArrowBound = testAction.changeNameWithActionBoundArrowFunc;
    actionArrowBound('davis');
    expect(testAction.name).toBe('davis');
  });

  test('Test without action throw error', () => {
    expect(testAction.name).toBe('jack');
    expect(() => testAction.changeNameWithoutAction('lucy')).toThrowError();
  });

  test('Test action bound', () => {
    expect(testAction.name).toBe('jack');
    const actionWithoutBound = testAction.changeName;
    const actionWithBound = testAction.changeNameWithBound;
    expect(() => actionWithoutBound('lucy')).toThrowError();
    actionWithBound('mike');
    expect(testAction.name).toBe('mike');
  });

  test('Test action decorate non-function', () => {
    expect(() => new TestActionNonFunction()).toThrowError();
  });
});
