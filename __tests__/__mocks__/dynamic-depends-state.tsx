import { testStore } from './array-store';
import { observer } from '../../src';
import React from 'react';

@observer
export class Dynamic extends React.Component {
  public renderTimes = 0;
  public render() {
    this.renderTimes++;
    if (this.renderTimes > 2) return null;
    return testStore.fruits.length;
  }
}
