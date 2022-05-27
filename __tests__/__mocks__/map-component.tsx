import { mapStore } from './map-store';
import { observer } from '../../src';
import React from 'react';

const ChildKey = observer((props: { id: string }) => {
  mapStore.childrenRenderTimes++;
  return <div>{mapStore.data.get(props.id)}</div>;
});

const ChildValue = observer((props: { value: string }) => {
  mapStore.childrenRenderTimes++;
  return <div>{props.value}</div>;
});

@observer
export class MapContianer extends React.Component {
  renderTimes = 0;
  renderSize(): React.ReactNode {
    return <div>{mapStore.data.size}</div>;
  }

  renderGet() {
    return <div>{mapStore.data.get('a')}</div>;
  }

  renderContent() {
    return this.renderSize();
  }

  render(): React.ReactNode {
    this.renderTimes++;
    return this.renderContent();
  }
}

export class MapContianerGetBasicValue extends MapContianer {
  renderContent() {
    return this.renderGet();
  }
}

export class MapContianerHas extends MapContianer {
  renderHas() {
    return <div>{mapStore.data.has('a')}</div>;
  }

  renderContent() {
    return this.renderHas();
  }
}

export class MapContianerKeys extends MapContianer {
  children() {
    const children: JSX.Element[] = [];
    for (const key of mapStore.data.keys()) {
      children.push(<ChildKey key={key} id={key} />);
    }
    return children;
  }

  renderContent() {
    return <div>{this.children()}</div>;
  }
}

export class MapContianerValues extends MapContianerKeys {
  children() {
    const children: JSX.Element[] = [];
    for (const v of mapStore.data.values()) {
      children.push(<ChildValue key={v} value={v} />);
    }
    return children;
  }
}

export class MapContianerEntries extends MapContianerValues {
  getIterator() {
    return mapStore.data.entries();
  }

  children() {
    const children: JSX.Element[] = [];
    for (const [k, v] of this.getIterator()) {
      children.push(<ChildKey key={k} id={v} />);
    }
    return children;
  }
}

export class MapContianerSymbolIterator extends MapContianerValues {
  getIterator() {
    return mapStore.data[Symbol.iterator]();
  }

  children() {
    const children: JSX.Element[] = [];
    for (const [k, v] of this.getIterator()) {
      children.push(<ChildKey key={k} id={v} />);
    }
    return children;
  }
}

export class MapContianerForEach extends MapContianerKeys {
  children() {
    const children: JSX.Element[] = [];
    mapStore.data.forEach((_, key: string) => {
      children.push(<ChildKey key={key} id={key} />);
    });
    return children;
  }
}
