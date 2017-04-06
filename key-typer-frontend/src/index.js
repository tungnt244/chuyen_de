import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Compete from'./components/Compete';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <Route path='compete/:room' component={Compete}/>
    </Route>
  </Router>  
),document.getElementById('root'));
