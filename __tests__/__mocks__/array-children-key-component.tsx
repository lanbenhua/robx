import React from 'react';
import { IPerson, testStore } from './array-store';
import { observer } from '../../src';

@observer
export class TestObjectArrayContainerIndexKey extends React.Component {
  personRenderTimes = 0;
  renderTimes = 0;

  Person = observer((props: { id: string; index: number }) => {
    this.personRenderTimes++;
    return (
      <div>
        <span>{props.id}</span>
        <span>{props.index}</span>
      </div>
    );
  });

  renderContent(person: IPerson, index: number) {
    return <this.Person index={index} id={person.name} key={index} />;
  }

  render(): React.ReactNode {
    this.renderTimes++;
    return (
      <div>
        {testStore.persons.map((person, index) => {
          return this.renderContent(person, index);
        })}
      </div>
    );
  }
}

export class TestObjectArrayContainerIdKey extends TestObjectArrayContainerIndexKey {
  personRenderTimes = 0;
  renderTimes = 0;
  Person = observer((props: { id: string }) => {
    this.personRenderTimes++;
    return (
      <div>
        <span>{props.id}</span>
      </div>
    );
  });

  getPerson(id: string) {
    return testStore.persons.find(({ name }) => name === id);
  }

  PersonProfile = observer((props: { id: string }) => {
    const person = this.getPerson(props.id);
    this.personRenderTimes++;
    return (
      <div>
        <span>{person.age}</span>
        <span>{person.name}</span>
      </div>
    );
  });

  renderContent(person: IPerson) {
    return <this.Person id={person.name} key={person.name} />;
  }
}

export class TestIdKeyArrayFindPersonProfile extends TestObjectArrayContainerIdKey {
  renderContent(person: IPerson) {
    return <this.PersonProfile id={person.name} key={person.name} />;
  }
}

export class TestIdKeyComputedMapFindPersonProfile extends TestIdKeyArrayFindPersonProfile {
  getPerson(id: string) {
    return testStore.computedPersonMap[id];
  }
}

export class TestIdKeyOnlyComputedMapFindPersonProfile extends TestIdKeyArrayFindPersonProfile {
  getPerson(id: string) {
    return testStore.onlyComputedPersonMap[id];
  }
}
