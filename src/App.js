import React from "react";
import Home from "./components/frontEnd/Home";
import Login from "./components/frontEnd/auth/Login";
import Registration from "./components/frontEnd/auth/Registration";
import AdminPrivateRoute from "./AdminPrivateRoute";
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';


axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? 'Bearer '+token : '';
  return config;
});

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>

            <AdminPrivateRoute path="/admin" name="Admin" />

            {/* <PublicRoute path="/" name="Home" /> */}

            {/* <Route path="/login">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path="/register">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
            </Route> */}

            <Route exact path="/" name="Home" component={Home} />
            <Route path="/login">
              {localStorage.getItem('auth_token') ? < Redirect to='/' /> : <Login />}
            </Route>
            <Route path="/registration">
              {localStorage.getItem('auth_token') ? < Redirect to='/' /> : <Registration />}
            </Route>
            
            {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} /> */}


          </Switch>
        </Router>
    </div>
  );
}

export default App;
