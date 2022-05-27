/* eslint-disable @typescript-eslint/no-explicit-any */
import { observable, action } from '../../../src';

class TestStore {
  @observable
  name = 'John';

  @action.bound
  changeName() {
    this.name = 'Jack';
  }

  @observable
  obj = {
    boy: 'Jack',
    girl: 'Rose',
    teacher: {
      name: 'Nancy',
      age: 38,
    },
  };

  @action.bound
  updateObj = () => {
    this.obj.girl = `lucy_${Math.random().toString().slice(2, 6)}`;
    this.obj.boy = `jack_${Math.random().toString().slice(2, 6)}`;
  };

  @observable
  fruits = ['apple', 'orange', 'banana'];

  testFruits = ['pear', 'peach'];

  @action
  updateFruits() {
    this.fruits[0] = Math.random().toString().slice(2, 6);
    // this.fruits.push(Math.random().toString().slice(2, 6));
    // this.fruits = this.fruits;
    // this.fruits = this.testFruits;
    // delete this.fruits[0];
    // this.fruits.push();
  }

  @observable
  map = new Map<string, any>();

  @action
  setMap(key: string, value: any) {
    this.map.set(key, value);
  }

  @action
  deleteMapKey(key: string) {
    this.map.delete(key);
  }

  @observable
  set = new Set();

  @action
  addSet(value: any) {
    this.set.add(value);
  }

  @action
  deleteSet(value: any) {
    this.set.delete(value);
  }

  @action.bound
  updateTeacher() {
    this.obj.teacher.age = +Math.random().toString().slice(2, 4);
    this.obj.teacher.name = 'Nancy_' + Math.random().toString().slice(2, 4);
  }

  @action
  updateGirlName = () => {
    (this.obj as any).father = Math.random();
  };
}

export const testStore = new TestStore();

testStore.setMap('age', 18);
testStore.setMap('name', 'yaguang');
testStore.setMap('title', 'see');
testStore.setMap('company', 'shopee');

testStore.addSet('age');
testStore.addSet('name');
testStore.addSet('title');
testStore.addSet('company');
testStore.addSet('salary');
