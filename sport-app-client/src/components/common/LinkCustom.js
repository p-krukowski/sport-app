import styled from "styled-components";
import {Link} from "react-router-dom";
import {theme} from "../../util/theme";

const LinkCustom = styled(Link)`
  color: white;
  margin: 0 5px;
  transition: color .2s;
  
  :hover {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
  
  @media only screen and (min-width: 768px) {
    margin: 0 10px;
  }
`
export default LinkCustom;