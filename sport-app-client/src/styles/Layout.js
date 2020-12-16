import React from "react"
import styled, {createGlobalStyle} from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';
import {theme} from "../util/theme";
import {ThemeProvider} from "@material-ui/styles";
import {muiTheme} from "../util/muiTheme";

const Layout = ({children}) => (
    <>
      <GlobalStyle/>
      <StyledWrapper>
        <ThemeProvider theme={muiTheme}>
          {children}
        </ThemeProvider>
      </StyledWrapper>
    </>
)

export default Layout;

const GlobalStyle = createGlobalStyle`
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: ${theme.colors.primary};
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px inherit inset;
    transition: background-color 5000s ease-in-out 0s;
    font: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat'; 
    font-size: 1em;
    color: white;
    background: ${theme.colors.background} !important;
  }
  
      /* width */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: none;      
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0);
    }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  *:focus {
    outline: none!important;
  }
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
    
  @media (max-width: 768px) {
    flex-direction: column;
  }
`