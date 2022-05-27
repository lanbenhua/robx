import React from 'react';

import { observer } from '../../../../src';
import { ITestParams } from 'types';
import { testStore } from 'store';

@observer
export class BaseTypeContainer extends React.Component<ITestParams> {
  public renderProfile() {
    return (
      <div>
        name = {testStore.name}, id = ${this.props.id}
      </div>
    );
  }

  renderUpdateName() {
    return <div onClick={testStore.changeName}>update name</div>;
  }

  public render() {
    console.log('test base', testStore);
    return (
      <>
        {this.renderProfile()}
        {this.renderUpdateName()}
      </>
    );
  }
}
