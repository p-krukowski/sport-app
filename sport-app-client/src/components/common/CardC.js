import styled from "styled-components";
import {theme} from "../../util/theme";

const Card = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${theme.colors.navbar};
  border-radius: 5px;
  border-color: ${theme.colors.background};
  margin-bottom: 10px;
  font-size: 1rem;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 5px 15px;
  background: none;
  border-bottom: 1px solid;
  border-color: inherit;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 1.1em;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 15px;
  background: none;
  font-size: 1em;
  overflow: scroll;
`

const CardFoot = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  background: none;
  border-top: 1px solid;
  border-color: inherit;
  min-height: 2em;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px 15px;
  font-size: 0.85em;
`

export {Card, CardBody, CardHeader, CardFoot};
