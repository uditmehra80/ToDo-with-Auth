import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';

export const CredentialsContext = React.createContext(null);


function App() {
 // const credentialsState = useState(null);
  //tempory
  const credentialsState = useState(null);
  return (
    <div className="App-header">
      <CredentialsContext.Provider value={credentialsState}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
