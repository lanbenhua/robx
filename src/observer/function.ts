/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Reaction } from './reaction';

export function reactionFunction(originalRender: React.FunctionComponent<any>) {
  const render = (props: any, context?: any) => {
    const ref = React.useRef<Reaction>(null);
    if (!ref.current) {
      ref.current = new Reaction(`${originalRender.name}.render()`);
    }

    const [, setState] = useState({});
    ref.current.setUpdate(() => {
      setState({});
    });

    useEffect(() => {
      return () => {
        ref.current.unmount();
        ref.current = null;
      };
    }, []);

    return ref.current.render(() => originalRender(props, context));
  };

  return React.memo(render) as React.FunctionComponent<any>;
}
