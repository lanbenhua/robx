/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { testStore } from './array-store';
import { observer } from '../../src';

@observer
export class TestContainer extends React.Component<any, any> {
  renderTimes = 0;
  render(): React.ReactNode {
    this.renderTimes++;
    return <div>{testStore.fruits.length}</div>;
  }
}

@observer
export class TestContainer2 extends TestContainer {
  render(): React.ReactNode {
    this.renderTimes++;
    return (
      <div>
        {testStore.fruits.map((fruit) => {
          return fruit;
        })}
      </div>
    );
  }
}

@observer
export class TestContainer3 extends TestContainer {
  render(): React.ReactNode {
    this.renderTimes++;
    testStore.fruits;
    return <div>{null}</div>;
  }
}

@observer
export class TestObjectArrayContainerChildrenWrappedByObserver extends React.Component {
  personRenderTimes = 0;
  renderTimes = 0;
  Person = observer((props: { id: string; index: number }) => {
    const person = testStore.persons[props.index];
    this.personRenderTimes++;
    return (
      <div>
        <span>{props.id}</span>
        <span>{person.age}</span>
        <span>{person.name}</span>
      </div>
    );
  });

  render(): React.ReactNode {
    this.renderTimes++;
    return (
      <div>
        {testStore.persons.map((person, index) => {
          return <this.Person index={index} id={person.name} key={index} />;
        })}
      </div>
    );
  }
}

export class TestObjectArrayContainerChildrenWithoutObserver extends TestObjectArrayContainerChildrenWrappedByObserver {
  Person = (props: { id: string; index: number }) => {
    const person = testStore.persons[props.index];
    this.personRenderTimes++;
    return (
      <div>
        <span>{props.id}</span>
        <span>{person.age}</span>
        <span>{person.name}</span>
      </div>
    );
  };
}
