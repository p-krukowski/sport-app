import styled from "styled-components";
import {theme} from "../util/theme";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const NavbarLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 3px 8px;
  align-items: center;
  color: white;
  background: ${theme.colors.navbar};
  height: 50px;
`

export const AuthenticationDiv = styled.div`
  display: flex;
  margin-left: auto;
`

export const MenuDiv = styled.div`
  overflow-x: auto;
  margin: auto;
    
  @media only screen and (min-width: 768px) {
    margin-left: 0;
  }  
`

export const Logo = styled(Link)`
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

export const LogoForMobile = styled(Link)`
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

export const ButtonC = styled(Button)`
  @media only screen and (max-width: 768px) {
    display: none !important;
  }
`

export const ButtonForMobile = styled.div`
  svg {
    font-size: 2em;
  }

  @media only screen and (min-width: 767px) {
    display: none
  }  
`