import { action, observable } from '../../src';

export class TestObservable {
  @observable
  name = 'jack';

  @observable
  age = 18;

  @observable
  info = {
    title: 'Senior FE developer',
    salary: 10000,
    team: 'Big Data',
    permisson: {
      read: true,
      write: true,
    },
  };

  @action.bound
  changeName(name: string) {
    this.name = name;
  }

  @action.bound
  public transferTo(team: string) {
    this.info.team = team;
  }

  @action.bound
  public changePermission(read: boolean, write: boolean) {
    this.info.permisson.read = read;
    this.info.permisson.write = write;
  }

  @action.bound
  public changePermissionObject(obj: { read: boolean; write: boolean }) {
    this.info.permisson = obj;
  }
}
