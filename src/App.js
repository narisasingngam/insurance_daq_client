import React from 'react';
import './App.css';
import InputDetail from './components/inputDetails'
import NavBar from './components/NavBar'
import { Switch, Route } from 'react-router-dom';
import inputDetail from './components/inputDetails'
import SearchCompany from './components/SearchCompany'

function App() {
  return (
    <React.Fragment>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={inputDetail}></Route>
          <Route path="/companies" component={SearchCompany}></Route>
        </Switch>
    </React.Fragment>
  );
}

export default App;
