import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react'
import * as store from './store'
import Login from './router/login'

function RouterConfig() {
  return (
    <Provider {...store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default RouterConfig;
