import { testStore } from './array-store';
import { observer } from '../../src';
import React from 'react';

@observer
export class TestContainerDeDependency extends React.Component {
  renderTimes = 0;
  render(): React.ReactNode {
    this.renderTimes++;
    if (this.renderTimes > 3) return null;
    return (
      <div>
        {testStore.fruits.map((fruit, index) => {
          return <span key={index}>{fruit}</span>;
        })}
      </div>
    );
  }
}
