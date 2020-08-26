import styled from "styled-components";
import {Link} from "react-router-dom";

const LinkBlank = styled(Link)`
  color: white;
  transition: color .3s;
  
  :hover {
    color: lightgray;
    text-decoration: none;
  }
`
export default LinkBlank;