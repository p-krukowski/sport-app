import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';

import {ACCESS_TOKEN} from '../../constants';
import {theme} from "../../util/theme";
import Button from "./Button";
import LinkInButton from "./LinkInButton";
import LinkCustom from "./LinkCustom";

class NavigationBar extends Component {

    handleLogout = () => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            localStorage.removeItem(ACCESS_TOKEN);
        }
        window.location.reload();
    }

    componentDidMount() {
        this.props.updateNavbarHeight(document.getElementById('navbar').clientHeight);
    }

    render() {
        return (
            <Navbar id='navbar'>
                <Logo to={"/"}>SportApp</Logo>
                <MenuDiv>
                    <LinkCustom to={"/panel"}>Panel</LinkCustom>
                    <LinkCustom to={"/newsy"}>Newsy</LinkCustom>
                    <LinkCustom to={"/wpisy"}>Wpisy</LinkCustom>
                    <LinkCustom to={"/wyniki"}>Wyniki</LinkCustom>
                </MenuDiv>
                {this.props.isAuthenticated ?
                    <AuthenticationDiv>
                        <Button as={LinkInButton} to={"/moje-konto"}>
                            Moje konto
                        </Button>
                        <Button as={LinkInButton} to={"#"} onClick={this.handleLogout}>
                            Wyloguj
                        </Button>
                    </AuthenticationDiv>
                    :
                    <AuthenticationDiv>
                        <Button as={LinkInButton} to={"/login"}>
                            Zaloguj
                        </Button>
                        <Button as={LinkInButton} to={"/signup"}>
                            Rejestracja
                        </Button>
                    </AuthenticationDiv>

                }
            </Navbar>
        )
    }
}

export default NavigationBar;

const Navbar = styled.div`
  width: 100%;
  padding: 3px 8px;
  display: flex;
  flex-direction: row;
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
`