import React, { useEffect } from 'react';
import { IPerson, arrayStore } from '../../store/array-store';
import { observer } from '../../../../src';

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
        {arrayStore.persons.map((person, index) => {
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
    console.log('old id ===>', id);
    return arrayStore.persons.find(({ name }) => name === id);
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

@observer
export class TestIdKeyMapFindPersonProfile extends React.Component {
  personRenderTimes = 0;
  renderTimes = 0;

  Profile = (props: { id: string }) => {
    // const person = { name: props.id, age: Math.random().toString().slice(2, 4) };
    const person = this.getPerson(props.id);
    this.personRenderTimes++;
    useEffect(() => {
      return () => {
        console.log('person ummount ===>', props.id);
      };
    }, []);
    return (
      <div>
        <span>{person.age}</span>
        <span>{person.name}</span>
      </div>
    );
  };

  PersonProfile = observer(this.Profile);

  getPerson(id: string) {
    console.log('person id ===>', id);
    return arrayStore.personMap[id];
  }

  render(): React.ReactNode {
    this.renderTimes++;
    console.log('person this.renderTimes ===>', this.renderTimes);
    return (
      <div>
        {arrayStore.persons.map((person) => {
          return <this.PersonProfile id={person.name} key={person.name} />;
        })}
        <button
          onClick={() => {
            // arrayStore.unshiftPerson({
            //   age: 29,
            //   name: `Sea${Math.random().toString().slice(2, 7)}`,
            // });
            arrayStore.updatePersonAge(0, 30);
          }}
        >
          unshift person
        </button>
      </div>
    );
  }
}
