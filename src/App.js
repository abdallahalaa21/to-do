import React from 'react';
import HomePage from 'pages/HomePage';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route path="/" component={HomePage} />
  </Switch>
);

export default App;
