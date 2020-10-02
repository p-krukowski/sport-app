import styled from "styled-components";
import {Toast} from "react-bootstrap";
import {theme} from "../../util/theme";

const ToastCustom = styled(Toast)`
  position: fixed;
  bottom: 10px;
  left: 10px;
  min-width: 200px;
  color: white;
  background: ${theme.colors.navbar};
  z-index: 2;                 
`
export default ToastCustom;