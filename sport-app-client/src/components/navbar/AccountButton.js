import {IconButton} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LinkBlank from "../common/LinkBlank";
import {MeetingRoom, Person} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import {ACCESS_TOKEN} from "../../constants";

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
              component={LinkBlank}
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
  )
}

export default AccountButton;