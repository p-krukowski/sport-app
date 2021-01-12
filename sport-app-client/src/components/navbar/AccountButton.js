import {Button, IconButton} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LinkInternal from "../common/LinkInternal";
import {MeetingRoom, Person} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import {ACCESS_TOKEN} from "../../constants";
import {connect} from "react-redux";

const AccountButton = (props) => {

  const [accountMenu, setAccountMenu] = useState(false);

  const handleLogout = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
    window.location.reload();
  }

  const handleMenu = () => {
    props.setTab(false);
    setAccountMenu(false);
  }

  return (
      props.isAuthenticated ?
          <>
            <IconButton
                id="account-button"
                edge={"end"}
                size={"small"}
                onClick={() => setAccountMenu(true)}
            >
              <AccountCircleIcon fontSize={"large"}/>
            </IconButton>
            <Menu
                anchorEl={document.getElementById("account-button")}
                open={accountMenu}
                onClose={() => setAccountMenu(false)}
            >
              <MenuItem
                  component={LinkInternal}
                  to={"/moje-konto"}
                  onClick={handleMenu}
              >
                <Person/>
                <Box ml={1}>
                  Mój profil
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <MeetingRoom/>
                <Box ml={1}>
                  Wyloguj
                </Box>
              </MenuItem>
            </Menu>
          </>
          :
          <Button
              component={LinkInternal}
              to={"/logowanie"}
              onClick={() => props.setTab(false)}
              variant={"outlined"}
              size={"small"}
              color={"primary"}
          >
            Logowanie
          </Button>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,)(AccountButton);