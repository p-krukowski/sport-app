import React from "react"
import styled, {createGlobalStyle} from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';
import {theme} from "../util/theme";

const Layout = ({children}) => (
    <>
        <GlobalStyle/>
        <StyledWrapper>
            {children}
        </StyledWrapper>
    </>
)

export default Layout;

const GlobalStyle = createGlobalStyle`
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