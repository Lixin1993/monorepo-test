import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route } from 'react-router'
import Login from './pages/login'
import { createHashHistory } from 'history'
import * as serviceWorker from './serviceWorker';

const App = () => {
  const history = createHashHistory();
  return (
    <Router history={history}>
      <Route path={'/login'} component={Login} />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
