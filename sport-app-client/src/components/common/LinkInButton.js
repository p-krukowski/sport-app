import styled from "styled-components";
import {Link} from "react-router-dom";

const LinkInButton = styled(Link)`
  margin: 5px;
  color: inherit;
  
  :hover {
    text-decoration: none;
  }
`
export default LinkInButton;