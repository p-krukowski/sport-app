import styled from "styled-components";
import {theme} from "../../util/theme";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: ${theme.colors.navbar};
  border-radius: 5px;
  border-color: ${theme.colors.background};
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 5px 15px;
  background: inherit;
  border-bottom: 1px solid;
  border-color: inherit;
  font-weight: ${theme.font.bold};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  background: inherit;
  font-size: 0.85rem;
  overflow: scroll;
`

const CardFoot = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  background: inherit;
  border-top: 1px solid;
  border-color: inherit;
  height: 2rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px 15px;
  font-size: 0.85rem;
`

export {Card, CardBody, CardHeader, CardFoot};
