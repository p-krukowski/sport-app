import styled from "styled-components";
import {Link} from "react-router-dom";
import {theme} from "../../util/theme";

const LinkCustom = styled(Link)`
  color: white;
  margin: 0 10px;
  transition: color .2s;
  
  :hover {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
`
export default LinkCustom;