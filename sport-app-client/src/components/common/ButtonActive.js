import styled from "styled-components";
import {theme} from "../../util/theme";

const ButtonActive = styled.button`
  background: none;
  border: solid 1px ${theme.colors.primary};
  border-radius: 7px;
  transition: background .2s, color .2s;
  margin: 3px;
  padding: 5px 5px;
  color: ${theme.colors.background};
  background: ${theme.colors.primary};
  
  :hover {
    color: ${theme.colors.primary};
    background: none;
  }
  
  :focus {
    outline: none;
  }
  
  :disabled {
    color: gray;
    background: none;
    border: solid 1px gray;
    
    :hover {
      color: gray;
      background: none;
      border: solid 1px gray;
    }
  }
`
export default ButtonActive;