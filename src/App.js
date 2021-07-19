import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import Header from 'components/Header';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </>
);

export default App;
