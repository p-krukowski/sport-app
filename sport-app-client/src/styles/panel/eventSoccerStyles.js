import styled from "styled-components";
import {theme} from "../../util/theme";
import Badge from "react-bootstrap/Badge";

export const EventSoccerLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${theme.colors.darkgray};
  margin-bottom: 5px;
  align-items: center;
  padding: 5px 3px;
  border-radius: 3px;
`

export const ResultRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  width: 100%;
`
export const ResultBadge = styled.div`
  background: white;
  color: black;
  border-radius: 3px;
  font-weight: ${theme.font.bold};
  padding: 0.1em 0.5em;
  margin: 0 0.2em;
`

export const TeamNameDiv = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;  
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`

export const BadgeCustom = styled(Badge)`
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`