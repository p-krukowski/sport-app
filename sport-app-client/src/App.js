import React, {Component} from 'react';
import styled from "styled-components";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import EntriesPage from './pages/EntriesPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import PanelPage from "./pages/PanelPage";
import NewsPage from "./pages/NewsPage";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./layout/Layout";
import {getCurrentUser} from "./util/apiUtils/AuthUtils";
import NavigationBar from "./components/common/NavigationBar";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isComponentReady: false
        };
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
        return (
            this.state.isComponentReady &&
            <Router>
                <Layout>
                    <NavigationBar isAuthenticated={this.state.isAuthenticated}
                                   currentUser={this.state.currentUser}/>
                    <MainContainer>
                        <Route path="/" exact render={
                            props => <PanelPage {...props}
                                                isAuthenticated={this.state.isAuthenticated} />}/>
                        <Route path="/panel" exact render={
                            props => <PanelPage {...props}
                                                isAuthenticated={this.state.isAuthenticated} />}/>
                        <Route path="/newsy" exact render={
                            props => <NewsPage {...props}
                                               isAuthenticated={this.state.isAuthenticated} />}/>
                        <Route path="/wpisy" exact render={
                            props =>
                                <EntriesPage {...props}
                                             isAuthenticated={this.state.isAuthenticated} />}/>
                        <Route path="/wyniki" exact component={ResultsPage}/>
                        <Route path="/signup" exact render={
                            props => <SignUpPage {...props}
                                                 isAuthenticated={this.state.isAuthenticated} />}/>
                        <Route path="/login" exact render={
                            props => <LoginPage {...props}
                                                isAuthenticated={this.state.isAuthenticated} />}/>
                        <Route path="/moje-konto" exact render={
                            props => <AccountPage {...props}
                                                  isAuthenticated={this.state.isAuthenticated} />}/>
                    </MainContainer>
                </Layout>
            </Router>

        );
    }
}


const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  padding: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`