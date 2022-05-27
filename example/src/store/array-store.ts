import { action, observable, onlyComputed } from '../../../src';

export interface IPerson {
  age: number;
  name: string;
}

class TestStore {
  @observable
  fruits: string[];
  @observable
  persons: IPerson[];

  @onlyComputed
  get personMap() {
    const map: Record<string, IPerson> = {};
    this.persons.map((person) => {
      map[person.name] = person;
    });
    return map;
  }

  newFruits = ['pear', 'peach', 'watermelon'];

  constructor() {
    this.init();
  }

  @action.bound
  init() {
    this.fruits = ['apple', 'banana', 'orange'];
    this.persons = [
      { age: 18, name: 'jack' },
      { age: 19, name: 'lucy' },
    ];
  }

  @action.bound
  update(index: number, fruit: string) {
    this.fruits[index] = fruit;
  }

  @action.bound
  setNewFruitWithSameRef() {
    this.fruits = this.newFruits;
  }

  @action.bound
  setNewFruit() {
    this.fruits = [...this.newFruits];
  }

  @action.bound
  push(fruit: string) {
    this.fruits.push(fruit);
  }

  @action.bound
  batchPush() {
    this.fruits.push('pear');
    this.fruits.push('peach');
    this.fruits.push('watermelon');
  }

  @action.bound
  popTwice() {
    this.fruits.pop();
    this.fruits.pop();
  }

  @action.bound
  delete(index: number) {
    this.fruits.splice(index, 1);
  }

  @action.bound
  updatePersonAge(index: number, age: number) {
    this.persons[index].age = age;
  }

  @action.bound
  pushPerson(person: IPerson) {
    this.persons.push(person);
  }

  @action.bound
  popPerson() {
    this.persons.pop();
  }

  @action.bound
  shiftPerson() {
    this.persons.shift();
  }

  @action.bound
  unshiftPerson(person: IPerson) {
    this.persons.unshift(person);
  }
}

export const arrayStore = new TestStore();

// testStore.personMap;
