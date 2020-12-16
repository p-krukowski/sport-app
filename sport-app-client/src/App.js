import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import EntriesPage from './pages/EntriesPage';
import AccountPage from './pages/AccountPage';
import PanelPage from "./pages/PanelPage";
import AllNewsPage from "./pages/AllNewsPage";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./styles/Layout";
import {getCurrentUser} from "./util/apiUtils/AuthUtils";
import NavigationBar from "./components/common/NavigationBar";
import NewsPage from "./pages/NewsPage";
import AuthPage from "./pages/AuthPage";
import {connect} from "react-redux";
import {setCurrentUser, setIsAuthenticated} from "./actions/authActions";
import {MainContainer} from "./styles/mainContainerStyles";

const App = (props) => {

  const [isComponentReady, setIsComponentReady] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateNavbarHeight = (navbarHeight) => {
    setContainerHeight(window.innerHeight - navbarHeight);
  }

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
          <NavigationBar isAuthenticated={props.isAuthenticated}
                         currentUser={props.currentUser}
                         updateNavbarHeight={updateNavbarHeight}/>
          <MainContainer style={{height: containerHeight}}>
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
              () => <NewsPage {...props}
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
    isAuthenticated: state.auth.isAuthenticated
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