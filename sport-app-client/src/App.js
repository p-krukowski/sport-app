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
import NavBar from "./components/navbar/NavBar";
import Box from "@material-ui/core/Box";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "./components/common/Button";

const App = (props) => {

  const [isComponentReady, setIsComponentReady] = useState(false);
  const [demoDialog, setDemoDialog] = useState(true);

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

  const handleClose = () => {
    setDemoDialog(false);
  }

  return (
      isComponentReady &&
      <Router>
        <Layout>
          <NavBar/>
          <MainContainer
              style={{height: window.innerHeight - props.navBarHeight}}>
            <Box pt="50px"/>
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
          <Dialog
              open={demoDialog}
              onClose={handleClose}
          >
            <DialogTitle>Aplikacja w trakcie rozwoju</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Witaj na demonstracyjnej stronie SportApp. Aplikacja jest w
                trakcie
                rozwoju, więc jej funkcjonalność jest ograniczona.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Rozumiem
              </Button>
            </DialogActions>
          </Dialog>
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