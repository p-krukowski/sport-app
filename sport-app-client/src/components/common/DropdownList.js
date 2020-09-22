import styled from "styled-components";
import {theme} from "../../util/theme";

const DDList = styled.div`
  position: relative; 
  margin-bottom: 10px;
  background: ${theme.colors.background};
  border: solid 1px ${theme.colors.primary};
  border-radius: 5px;
`

const DDListSelected = styled.div`
  color: ${theme.colors.primary};
  background: ${theme.colors.background};
  border-radius: 5px;
  padding: 5px 20px;
  cursor: pointer;
`

const DDListOptions = styled.div`
  position: absolute;
  z-index: 1;
`

const DDListOption = styled.div`
  padding: 5px 20px;
  cursor: pointer;
  background: ${theme.colors.background};
  
  :hover {
    color: ${theme.colors.background};
    background: ${theme.colors.primary};
  }
`

export {DDList, DDListOption, DDListSelected, DDListOptions};