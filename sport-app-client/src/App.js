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
import NavBar from "./components/navbar/NavBar";
import Box from "@material-ui/core/Box";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

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
      console.log(
          new Error("Zaloguj się, aby uzyskać dostęp do wszystkich opcji"));
    });
  }, [])

  const handleClose = () => {
    setDemoDialog(false);
  }

  return (
      isComponentReady &&
      <Router>
        <Layout>
          <Box display={"flex"}>
            <NavBar/>
          </Box>
          <Box p={1} mt={{xs: "48px", md: 0}} display={"flex"} flexGrow={1}
               overflow={"auto"}>
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
          </Box>

          <Dialog
              open={false}
              //open={demoDialog}
              onClose={handleClose}
          >
            <DialogTitle>Aplikacja w trakcie rozwoju</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Witaj na demonstracyjnej stronie SportApp. Aplikacja jest w
                trakcie rozwoju, więc jej funkcjonalność jest ograniczona.<br/>
                Zapraszam do rejestracji!
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