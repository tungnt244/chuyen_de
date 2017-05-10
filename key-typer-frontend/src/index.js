import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Compete from'./components/Compete';
import PractiseTyper from './components/PractiseTyper'
import { Router, Route, browserHistory } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
ReactDOM.render((
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <Route path='compete/:room' component={Compete}/>
      <Route path='practise' component={PractiseTyper}/>
    </Route>
  </Router>  
),document.getElementById('root'));
