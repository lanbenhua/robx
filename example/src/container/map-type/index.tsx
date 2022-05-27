import React from 'react';
import { testStore } from 'store';

import { ITestParams } from 'types';
import { observer } from '../../../../src';

@observer
export class MapTypeContainer extends React.Component<ITestParams> {
  obj = { age: 20 };
  public renderProfile() {
    return (
      <div>
        map: <span>{testStore.map.keys().next().value}</span>
      </div>
    );
  }

  update() {
    this.forceUpdate();
  }

  renderUpdateName() {
    return (
      <div
        onClick={() => {
          testStore.setMap('age', Math.random());
          // const key = testStore.map.keys().next().value;
          // testStore.deleteKey(key);
          // testStore.setMap(Math.random().toString(), 'age1');
          // testStore.setMap('name', Math.random().toString());
          // this.obj.age = Math.random();
          // testStore.setMap('age', this.obj);
        }}
      >
        update Map
      </div>
    );
  }

  public render() {
    // console.log('test map ===>', testStore.map.values().next().value);
    // console.log('test map ===>', testStore.map.values().next().value);
    // console.log('test map ===>', testStore.map.values().next().value);

    for (const v of testStore.map) console.log('\t', v);

    // testStore.map.forEach((v, k) => {
    //   console.log('\t', k, v);
    // });

    return (
      <>
        {/* {this.renderProfile()} */}
        {this.renderUpdateName()}
      </>
    );
  }
}
