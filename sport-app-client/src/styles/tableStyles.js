import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";

export const TableNumberCell = styled(TableCell)`
  padding: 5px !important;
`

export const TableNarrowCell = styled(TableCell)`
  padding: 3px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`