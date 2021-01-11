import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";
import {theme} from "../../util/theme";

const LinkInternal = styled(RouterLink)`
  color: white;
  transition: color .3s;
  
  :hover {
    color: ${theme.colors.lightgray};
    text-decoration: none;
  }
`
export default LinkInternal;