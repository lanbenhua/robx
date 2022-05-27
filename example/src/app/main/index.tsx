import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Empty } from 'component/antd';
import './index.less';

import { BrowserRouter, NavigateRoute, Redirect, Switch } from 'component/router';
import { Routers } from 'lib/constant';
import { TestPage } from 'container/test-page';

class Router extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <NavigateRoute path={`${Routers.HOME}/:id?`} exact={true} component={TestPage} />
          <NavigateRoute path={`${Routers.TEST}/:id?`} exact={true} component={TestPage} />
          <Redirect to={Routers.HOME} />
        </Switch>
      </BrowserRouter>
    );
  }
}

class MainApp extends React.Component {
  public render() {
    return (
      <div className="root-container">
        <ConfigProvider renderEmpty={renderEmpty}>
          <Router />
        </ConfigProvider>
      </div>
    );
  }
}

const renderEmpty = () => <Empty />;
const renderApp = () => {
  ReactDOM.render(<MainApp />, document.getElementById('root'));
};

renderApp();

if (module.hot) {
  module.hot.accept();
}
