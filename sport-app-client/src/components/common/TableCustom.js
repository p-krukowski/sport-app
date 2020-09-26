import styled from "styled-components";
import {theme} from "../../util/theme";

const TableCustom = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1em;
  overflow: scroll;
`

const THead = styled.div`
  display: flex;
  flex-direction: column;
  background: #292929;
  font-weight: ${theme.font.regular};
  margin-bottom: 2px;
`

const TBody = styled.div`
  background: ${theme.colors.navbar};
`

const TFoot = styled.div`
  background: ${theme.colors.navbar};
`

const TR = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.background};
`
const TD = styled.div`
  display: flex;
  text-align: center;
  padding: 0.1em 0.5em;
`
export {TableCustom, TD, TR, THead, TBody, TFoot};