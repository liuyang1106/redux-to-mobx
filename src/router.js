import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react'
import * as store from './store'
import Login from './router/login'
import Home from './router/home'

function RouterConfig() {
  return (
    <Provider {...store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default RouterConfig;
