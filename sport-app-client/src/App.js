import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import EntriesPage from './pages/EntriesPage';
import AccountPage from './pages/AccountPage';
import PanelPage from "./pages/PanelPage";
import AllNewsPage from "./pages/AllNewsPage";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./styles/Layout";
import {getCurrentUser} from "./util/apiUtils/AuthUtils";
import NewsPage from "./pages/NewsPage";
import AuthPage from "./pages/AuthPage";
import {connect} from "react-redux";
import {setCurrentUser, setIsAuthenticated} from "./actions/authActions";
import {MainContainer} from "./styles/mainContainerStyles";
import Hidden from "@material-ui/core/Hidden";
import NavBar from "./components/navbar/NavBar";
import Box from "@material-ui/core/Box";

const App = (props) => {

  const [isComponentReady, setIsComponentReady] = useState(false);

  useEffect(() => {
    getCurrentUser()
    .then(response => {
      props.setUser(response);
      props.setAuthenticated(true);
      setIsComponentReady(true);
    }).catch(error => {
      props.setAuthenticated(false);
      setIsComponentReady(true);
    });
  }, [])

  return (
      isComponentReady &&
      <Router>
        <Layout>
          <NavBar/>
          <MainContainer style={{height: window.innerHeight - props.navBarHeight}}>
            <Hidden mdUp>
              <Box pt="50px"/>
            </Hidden>
            <Route path={["/", "/panel"]} exact render={
              () => <PanelPage {...props}
                               isAuthenticated={props.isAuthenticated}/>}/>
            <Route path="/newsy" exact render={
              () => <AllNewsPage {...props}
                                 isAuthenticated={props.isAuthenticated}/>}/>
            <Route path="/wpisy" exact render={
              () =>
                  <EntriesPage {...props}
                               isAuthenticated={props.isAuthenticated}/>}/>
            <Route path="/wyniki" exact render={
              () =>
                  <ResultsPage {...props}
                               isAuthenticated={props.isAuthenticated}/>}/>
            <Route path="/moje-konto" exact render={
              () => <AccountPage {...props}
                                 isAuthenticated={props.isAuthenticated}/>}/>
            <Route path="/newsy/:id" render={
              (props) => <NewsPage {...props}
                              isAuthenticated={props.isAuthenticated}/>}/>
            <Route path="/logowanie" exact render={
              () => <AuthPage {...props}
                              isAuthenticated={props.isAuthenticated}/>}/>
          </MainContainer>
        </Layout>
      </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.isAuthenticated,
    navBarHeight: state.layout.navBarHeight
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: currentUser => {
      dispatch(setCurrentUser(currentUser));
    },
    setAuthenticated: isAuthenticated => {
      dispatch(setIsAuthenticated(isAuthenticated));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);