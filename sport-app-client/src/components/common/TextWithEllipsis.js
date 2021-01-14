import styled from "styled-components";
import Box from "@material-ui/core/Box";

export const TextWithEllipsis = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.lines};
  -webkit-box-orient: vertical;
  line-height: 1.2;
`