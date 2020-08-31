import styled from "styled-components";
import {theme} from "../../util/theme";

const Button = styled.button`
  background: none;
  border: solid 1px ${theme.colors.primary};
  border-radius: 7px;
  transition: background .2s, color .2s;
  margin: 3px;
  padding: 5px 5px;
  color: ${theme.colors.primary};
  
  :hover {
    color: ${theme.colors.background};
    background: ${theme.colors.primary};
  }
  
  :focus {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    outline: none;
  }
`
export default Button;