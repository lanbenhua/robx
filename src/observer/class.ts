import React from 'react';
import { shadowCompareObject } from '../lib/utils';
import { ConstructorOf } from '../types';
import { Reaction } from './reaction';

export function reactionClass(ClassComponent: ConstructorOf<React.Component>) {
  const isPureClassComponent = ClassComponent.prototype instanceof React.PureComponent;
  ClassComponent.prototype.$$originalRender = ClassComponent.prototype.render;

  ClassComponent.prototype.$$reactiveRender = function () {
    let reaction = new Reaction(`${this.constructor.name}.render()`);
    reaction.setUpdate(() => {
      this.forceUpdate();
    });

    if (!isPureClassComponent) {
      if (this.shouldComponentUpdate) {
        console.error(
          `Please do not define \`shouldComponentUpdate\` method in <${this.constructor.name} />, because \`observer\` has optimized this method`
        );
      }

      // eslint-disable-next-line @typescript-eslint/ban-types
      this.shouldComponentUpdate = (newProps: object, newState: object) => {
        if (newState !== this.state) return true;
        return !shadowCompareObject(newProps, this.props);
      };
    }

    this.$$componentWillUnmount = this.componentWillUnmount;
    this.componentWillUnmount = () => {
      this.$$componentWillUnmount?.();
      reaction.unmount();
      reaction = null;
    };

    this.render = () => {
      return reaction.render(() => this.$$originalRender());
    };

    return this.render();
  };

  ClassComponent.prototype.render = function () {
    return this.$$reactiveRender();
  };

  return ClassComponent;
}
