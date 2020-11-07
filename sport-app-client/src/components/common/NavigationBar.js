import React, {Component} from 'react';

import {ACCESS_TOKEN} from '../../constants';
import LinkCustom from "./LinkCustom";
import {
  AuthenticationDiv, ButtonC,
  ButtonForMobile, Logo, LogoForMobile, MenuDiv, NavbarLayout
} from "../../styles/navigationBarStyles";
import {LinkAsText} from "./Link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class NavigationBar extends Component {

  handleLogout = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
    window.location.reload();
  }

  componentDidMount() {
    this.props.updateNavbarHeight(
        document.getElementById('navbar').clientHeight);
  }

  render() {
    return (
        <NavbarLayout id='navbar'>
          <Logo to={"/"}>SportApp</Logo>
          <LogoForMobile to={"/"}>S</LogoForMobile>
          <MenuDiv>
            <LinkCustom to={"/panel"}>Panel</LinkCustom>
            <LinkCustom to={"/newsy"}>Newsy</LinkCustom>
            <LinkCustom to={"/wpisy"}>Wpisy</LinkCustom>
            <LinkCustom to={"/wyniki"}>Wyniki</LinkCustom>
          </MenuDiv>
          {this.props.isAuthenticated ?
              <AuthenticationDiv>
                <LinkAsText to={"/moje-konto"}>
                  <ButtonC variant='outlined'>
                    Moje konto
                  </ButtonC>
                  <ButtonForMobile>
                    <AccountCircleIcon/>
                  </ButtonForMobile>
                </LinkAsText>

                <LinkAsText to={"#"} onClick={this.handleLogout}>
                  <ButtonC variant='outlined'>
                    Wyloguj
                  </ButtonC>
                  <ButtonForMobile>
                    <ExitToAppIcon />
                  </ButtonForMobile>
                </LinkAsText>
              </AuthenticationDiv>
              :
              <AuthenticationDiv>
                <LinkAsText to={"/logowanie"}>
                  <ButtonC variant='outlined' style={{marginRight: '5px'}}>
                    Zaloguj
                  </ButtonC>
                  <ButtonC variant='outlined'>
                    Zarejestruj
                  </ButtonC>
                  <ButtonForMobile>
                    <AccountCircleIcon/>
                  </ButtonForMobile>
                </LinkAsText>
              </AuthenticationDiv>
          }
        </NavbarLayout>
    )
  }
}

export default NavigationBar;