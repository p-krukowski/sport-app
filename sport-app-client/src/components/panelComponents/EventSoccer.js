import React, {Component} from 'react';
import styled from "styled-components";

import Badge from "react-bootstrap/Badge";
import {theme} from "../../util/theme";

class EventSoccer extends Component {

  render() {
    const event = this.props.event;

    return (
        <EventSoccerLayout>
          <Badge pill variant="light"
                 style={{fontSize: '1em'}}>
            {event.date}
          </Badge>
          <ResultRow>
            <TeamNameDiv style={{textAlign: 'right'}}>
              {event.homeTeamName}
            </TeamNameDiv>
            <ResultBadge>
              {event.homeScore}:{event.awayScore}
            </ResultBadge>
            <TeamNameDiv>
              {event.awayTeamName}
            </TeamNameDiv>
          </ResultRow>
        </EventSoccerLayout>
    );
  }
}

export default EventSoccer;

const EventSoccerLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${theme.colors.navbar};
  margin-bottom: 5px;
  align-items: center;
  padding: 5px 3px;
  border-radius: 3px;
`

const ResultRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`
const ResultBadge = styled.div`
  background: white;
  color: black;
  border-radius: 3px;
  font-weight: ${theme.font.bold};
  padding: 0.1em 0.5em;
  margin: 0 0.2em;
`

const TeamNameDiv = styled.p`
  display: block;
  min-width: 120px;
  overflow: hidden;  
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`