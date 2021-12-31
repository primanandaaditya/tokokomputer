import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from "./login/Login";
import Register from "./register/Register";
import ListUser from "./user/ListUser";
import Home from "./home/Home";

ReactDOM.render(
  <React.StrictMode>
      <Router>

          <Switch>
              <Route exact path="/">
                  <Login/>
              </Route>
              <Route exact path="/register">
                  <Register/>
              </Route>
              <Route exact path="/listuser">
                  <ListUser/>
              </Route>
              <Route exact path="/home">
                  <Home/>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
