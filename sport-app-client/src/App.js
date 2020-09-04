import React, {Component} from 'react';
import styled from "styled-components";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import EntriesPage from './pages/EntriesPage';
import AccountPage from './pages/AccountPage';
import PanelPage from "./pages/PanelPage";
import AllNewsPage from "./pages/AllNewsPage";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./layout/Layout";
import {getCurrentUser} from "./util/apiUtils/AuthUtils";
import NavigationBar from "./components/common/NavigationBar";
import NewsPage from "./pages/NewsPage";
import AuthPage from "./pages/AuthPage";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isComponentReady: false,
      containerHeight: 0
    };
  }

  updateNavbarHeight = (navbarHeight) => {
    let ch = window.innerHeight - navbarHeight;
    this.setState({
      containerHeight: ch
    })
  }

  componentDidMount() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isComponentReady: true
      });
    }).catch(error => {
      this.setState({
        isAuthenticated: false,
        isComponentReady: true
      });
    });
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    return (
        this.state.isComponentReady &&
        <Router>
          <Layout>
            <NavigationBar isAuthenticated={isAuthenticated}
                           currentUser={this.state.currentUser}
                           updateNavbarHeight={this.updateNavbarHeight}/>
            <MainContainer style={{height: this.state.containerHeight}}>
              <Route path="/" exact render={
                props => <PanelPage {...props}
                                    isAuthenticated={isAuthenticated}/>}/>
              <Route path="/panel" exact render={
                props => <PanelPage {...props}
                                    isAuthenticated={isAuthenticated}/>}/>
              <Route path="/newsy" exact render={
                props => <AllNewsPage {...props}
                                      isAuthenticated={isAuthenticated}/>}/>
              <Route path="/wpisy" exact render={
                props =>
                    <EntriesPage {...props}
                                 isAuthenticated={isAuthenticated}/>}/>
              <Route path="/wyniki" exact render={
                props =>
                    <ResultsPage {...props}
                                 isAuthenticated={isAuthenticated}/>}/>
              <Route path="/moje-konto" exact render={
                props => <AccountPage {...props}
                                      isAuthenticated={isAuthenticated}/>}/>
              <Route path="/newsy/:id" render={
                props => <NewsPage {...props}
                                   isAuthenticated={isAuthenticated}/>}/>
              <Route path="/logowanie" exact render={
                props => <AuthPage {...props}
                                    isAuthenticated={isAuthenticated}/>}/>
            </MainContainer>
          </Layout>
        </Router>
    );
  }
}

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  overflow: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`