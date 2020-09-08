import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';

import {ACCESS_TOKEN} from '../../constants';
import {theme} from "../../util/theme";
import Button from "./Button";
import LinkInButton from "./LinkInButton";
import LinkCustom from "./LinkCustom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
                <ButtonC as={LinkInButton} to={"/moje-konto"}>
                  Moje konto
                </ButtonC>
                <ButtonForMobile as={LinkInButton} to={"/moje-konto"}>
                  <AccountCircleIconCustom/>
                </ButtonForMobile>
                <ButtonC as={LinkInButton} to={"#"} onClick={this.handleLogout}>
                  Wyloguj
                </ButtonC>
              </AuthenticationDiv>
              :
              <AuthenticationDiv>
                <ButtonC as={LinkInButton} to={"/logowanie"}>
                  Zaloguj | Zarejestruj
                </ButtonC>
                <ButtonForMobile as={LinkInButton} to={"/logowanie"}>
                  <AccountCircleIconCustom/>
                </ButtonForMobile>
              </AuthenticationDiv>
          }
        </NavbarLayout>
    )
  }
}

export default NavigationBar;

const NavbarLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 3px 8px;
  align-items: center;
  color: white;
  background: ${theme.colors.navbar};
  height: 50px;
`

const AuthenticationDiv = styled.div`
  display: flex;
  margin-left: auto;
`

const MenuDiv = styled.div`
  overflow-x: auto;
  margin: auto;
    
  @media only screen and (min-width: 768px) {
    margin-left: 0;
  }  
`

const Logo = styled(Link)`
  color: white;
  font-size: 1.2em;
  font-weight: 500;
  font-style: italic;
  margin: 5px 20px 5px 5px;
  
  :hover {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
  
  @media (max-width: 767px) {
    display: none;
  }
`

const LogoForMobile = styled(Link)`
  color: white;
  font-size: 1.2em;
  font-weight: 500;
  font-style: italic;
  margin: 5px 5px 5px 5px;
  
  :hover {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`

const ButtonC = styled(Button)`
  @media only screen and (max-width: 768px) {
    display: none
  }
`

const ButtonForMobile = styled.div`
  svg {
    font-size: 2em;
  }

  @media only screen and (min-width: 767px) {
    display: none
  }  
`

const AccountCircleIconCustom = styled(AccountCircleIcon)`
`