import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import EntriesPage from './pages/EntriesPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import PanelPage from "./pages/PanelPage";
import NewsPage from "./pages/NewsPage";

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={EntriesPage}/>
          <Route path="/panel" exact component={PanelPage}/>
          <Route path="/newsy" exact component={NewsPage}/>
          <Route path="/wpisy" exact component={EntriesPage}/>
          <Route path="/signup" exact component={SignUpPage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/moje-konto" exact component={AccountPage}/>
        </Router>
      </div>
    );
  }

}