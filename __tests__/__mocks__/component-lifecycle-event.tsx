import React from 'react';

import { TestIdKeyArrayFindPersonProfile } from './array-children-key-component';
import { IPerson, testStore } from './array-store';
import { observer } from '../../src';

@observer
class PersonProfile extends React.Component<{
  id: string;
}> {
  getPerson(id: string) {
    return testStore.onlyComputedPersonMap[id];
  }

  render(): React.ReactNode {
    const person = this.getPerson(this.props.id);
    testStore.personProfileTimes++;
    return (
      <div>
        <span>{person.age}</span>
        <span>{person.name}</span>
      </div>
    );
  }
}

class PersonProfileWithUnmount extends PersonProfile {
  componentWillUnmount(): void {
    testStore.unmountedTimes++;
  }
}

export class TestChildrenClassComponentsWithUnmount extends TestIdKeyArrayFindPersonProfile {
  renderContent(person: IPerson) {
    return <PersonProfileWithUnmount id={person.name} key={person.name} />;
  }
}

export class TestChildrenClassComponentsWithoutUnmount extends TestIdKeyArrayFindPersonProfile {
  renderContent(person: IPerson) {
    return <PersonProfile id={person.name} key={person.name} />;
  }
}

export class TestClassComponentShouldComponentUpdate extends TestIdKeyArrayFindPersonProfile {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shouldComponentUpdate(_: any, __: any): boolean {
    return true;
  }

  renderContent(person: IPerson) {
    return <PersonProfile id={person.name} key={person.name} />;
  }
}
