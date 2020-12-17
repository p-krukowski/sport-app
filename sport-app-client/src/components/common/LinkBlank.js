import styled from "styled-components";
import {Link} from "react-router-dom";
import {theme} from "../../util/theme";

const LinkBlank = styled(Link)`
  color: white;
  transition: color .3s;
  
  :hover {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
`
export default LinkBlank;