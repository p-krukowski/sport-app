import styled from "styled-components";
import Box from "@material-ui/core/Box";

export const ZoomOnHover = styled(Box)`
  transition: transform ${props => props.time};
    :hover {
      transform: scale(${props => props.scale})
  }
`