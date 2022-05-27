import * as React from 'react';

import { navigate } from './navigate';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-types
export interface IRouterProps<T = {}> extends RouteComponentProps<T> {
  children?: React.ReactNode;
}

export const NavigateRoute: (props: RouteProps) => JSX.Element = (props) => {
  return (
    <Route
      {...props}
      component={(p: IRouterProps) => {
        navigate.setNavigator();
        // eslint-disable-next-line react/prop-types
        return React.createElement(props.component, p);
      }}
    />
  );
};

export * from 'react-router-dom';
export { navigate } from './navigate';
