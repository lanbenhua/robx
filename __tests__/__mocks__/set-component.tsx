import { setStore } from './set-store';
import { observer } from '../../src';
import React from 'react';
import { isBaseType } from 'src/lib/utils';

const ChildKey = observer((props: { id: string }) => {
  setStore.childrenRenderTimes++;
  return <div>{setStore.data.has(props.id)}</div>;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChildObjectValue = observer((props: { value: any }) => {
  setStore.childrenRenderTimes++;
  if (isBaseType(props.value)) return <div>{props.value}</div>;
  return <div>{props.value.notExist}</div>;
});

@observer
export class SetContianer extends React.Component {
  renderTimes = 0;
  renderSize(): React.ReactNode {
    return <div>{setStore.data.size}</div>;
  }

  renderHas() {
    return <div>{setStore.data.has('a')}</div>;
  }

  renderContent() {
    return this.renderSize();
  }

  render(): React.ReactNode {
    this.renderTimes++;
    return this.renderContent();
  }
}

export class SetContianerHas extends SetContianer {
  renderHas() {
    return <div>{setStore.data.has('a')}</div>;
  }

  renderContent() {
    return this.renderHas();
  }
}

export class SetContianerHasObject extends SetContianerHas {
  renderHas() {
    return <div>{setStore.hasObject()}</div>;
  }
}

export class SetContianerKeys extends SetContianer {
  children() {
    const children: JSX.Element[] = [];
    for (const key of setStore.data.keys()) {
      children.push(<ChildKey key={key} id={key} />);
    }
    return children;
  }

  renderContent() {
    return <div>{this.children()}</div>;
  }
}

export class SetContianerValues extends SetContianerKeys {
  children() {
    const children: JSX.Element[] = [];
    for (const v of setStore.objectData.values()) {
      children.push(<ChildObjectValue key={v} value={v} />);
    }
    return children;
  }
}

export class SetContianerForEach extends SetContianerKeys {
  children() {
    const children: JSX.Element[] = [];
    setStore.data.forEach((value) => {
      children.push(<ChildKey key={value} id={value} />);
    });
    return children;
  }
}

export class SetContianerEntries extends SetContianerKeys {
  children() {
    const children: JSX.Element[] = [];
    for (const [key, v] of setStore.objectData.entries()) {
      children.push(<ChildObjectValue key={key} value={v} />);
    }
    return children;
  }
}

export class SetContianerSymbolIterator extends SetContianerKeys {
  children() {
    const children: JSX.Element[] = [];
    const iterator = setStore.objectData[Symbol.iterator]();
    for (const v of iterator) {
      children.push(<ChildObjectValue key={v} value={v} />);
    }
    return children;
  }
}
