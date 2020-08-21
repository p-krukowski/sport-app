import styled from "styled-components";
import {theme} from "../../util/theme";

const TableCustom = styled.table`
  font-size: 0.95em;
  margin-bottom: 20px;
  
  TR:first-child {
    TD:first-child {
      border-top-left-radius: 5px;
    }
    TD:last-child {
      border-top-right-radius: 5px;
    }
  }

  TR:last-child {
    TD:first-child {
      border-bottom-left-radius: 5px;
    }
    TD:last-child {
      border-bottom-right-radius: 5px;
    }
  }
`

const THead = styled.thead`
  background: #292929;
  font-weight: ${theme.font.regular};
  border-bottom: 1px solid ${theme.colors.background};
  
  TD {
    padding: 0.3em 20px;
  }
`

const TBody = styled.tbody`
  background: ${theme.colors.navbar};
`

const TFoot = styled.tfoot`
  background: ${theme.colors.navbar};
`

const TR = styled.tr`  
  border-bottom: 1px solid ${theme.colors.background};
`
const TD = styled.td`
  padding: 0 20px;
  text-align: center;
`
export {TableCustom, TD, TR, THead, TBody, TFoot};