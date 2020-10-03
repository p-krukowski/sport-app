import styled from "styled-components";
import {theme} from "../../util/theme";

const InputTextArea = styled.textarea`
  border: none;
  display: flex;
  border-radius: 5px;
  padding: 10px;
  background: ${theme.colors.background};
  color: white;
  
  :focus {
    outline: none;
  }
  
  .url {
    
  }
`
const InputUrl = styled.input`
  border: none;
  display: flex;
  border-radius: 5px;
  padding: 10px;
  background: ${theme.colors.background};
  color: white;
  
  :focus {
    outline: none;
  }
`

export {InputTextArea, InputUrl};