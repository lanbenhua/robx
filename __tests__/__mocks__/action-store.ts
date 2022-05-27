import { action, observable } from '../../src';

export class TestAction {
  @observable
  name = 'jack';

  public changeNameWithoutAction(name: string) {
    this.name = name;
  }

  @action
  public changeName(name: string) {
    this.name = name;
  }

  @action
  public changeNameWithActionArrowFunc = (name: string) => {
    this.name = name;
  };

  @action.bound
  public changeNameWithBound(name: string) {
    this.name = name;
  }

  @action.bound
  public changeNameWithActionBoundArrowFunc(name: string) {
    this.name = name;
  }
}

export class TestActionNonFunction extends TestAction {
  @action
  nonFunction = 'nonFunction';
}
