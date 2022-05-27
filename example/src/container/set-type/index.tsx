import React from 'react';
import { setStore } from 'store/set-store';

import { ITestParams } from 'types';
import { observer } from '../../../../src';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChildObjectValue = observer((props: { value: any }) => {
  setStore.childrenRenderTimes++;
  console.log('child re-render', props.value);
  return <div>{props.value.notExist}</div>;
});

@observer
export class SetTypeContainer extends React.Component<ITestParams> {
  children(): JSX.Element[] {
    return [];
  }

  click() {
    // to do
  }

  render() {
    console.log('parent re-render');
    return (
      <div>
        <div>{this.children()}</div>
        <button onClick={() => this.click()}>add object to set</button>
      </div>
    );
  }
}

export class SetContianerValues extends SetTypeContainer {
  children() {
    console.log(setStore.objectData.size);
    const children: JSX.Element[] = [];
    for (const v of setStore.objectData.values()) {
      children.push(<ChildObjectValue key={v} value={v} />);
    }
    return children;
  }

  click() {
    setStore.updateObjectData();
  }
}

@observer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ChildKey extends React.Component<{ id: any }> {
  render() {
    setStore.childrenRenderTimes++;
    return <div>hello</div>;
  }
}

export class SetContianerKeys extends SetTypeContainer {
  children() {
    const children: JSX.Element[] = [];
    let index = 0;
    for (const key of setStore.data.keys()) {
      children.push(<ChildKey key={index} id={key} />);
      index++;
    }
    return children;
  }

  click() {
    setStore.addObject();
  }
}
