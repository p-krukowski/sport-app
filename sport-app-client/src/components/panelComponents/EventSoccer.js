import React, {Component} from 'react';
import styled from "styled-components";

import Badge from "react-bootstrap/Badge";
import {theme} from "../../util/theme";
import {Spinner} from "react-bootstrap";

class EventSoccer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: this.props.event
    }
  }

  setEvent = () => {
    const event = this.props.event;
    if (event.homeScore === null || event.awayScore === null) {
      this.setState({
        event: {
          ...this.props.event,
          homeScore: '-',
          awayScore: '-',
          date: this.setDate()
        }
      })
    } else {
      this.setState({
        event: {
          ...this.props.event,
          date: this.setDate()
        }
      })
    }
  }

  setDate() {
    const now = new Date();
    let tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    let yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const eventDate = new Date(this.props.event.dateTime);
    let eventEndDate = new Date(eventDate);
    eventEndDate.setMinutes(eventEndDate.getMinutes() + 105);

    if (now > eventDate && now < eventEndDate) {
      return 'Trwa';
    } else if (now.getDate() === eventDate.getDate()) {
      return 'Dzisiaj';
    } else if (yesterday.getDate() === eventDate.getDate()) {
      return 'Wczoraj';
    } else if (tomorrow.getDate() === eventDate.getDate()) {
      return 'Jutro';
    } else {
      return this.props.event.date;
    }
  }

  componentDidMount() {
    this.setEvent();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.event !== this.props.event) {
      this.setEvent();
    }
  }

  render() {
    const event = this.state.event;

    return (
        <EventSoccerLayout>
          <BadgeCustom pill variant="light">
            <span style={{marginRight: '0.5em'}}>{event.date},</span>
            <span style={{marginRight: '0.5em'}}>{event.time}</span>
            {
              event.date === 'Trwa' &&
              <Spinner variant="success" animation="grow" size="sm" />
            }
          </BadgeCustom>
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
  width: 100%;
`
const ResultBadge = styled.div`
  background: white;
  color: black;
  border-radius: 3px;
  font-weight: ${theme.font.bold};
  padding: 0.1em 0.5em;
  margin: 0 0.2em;
`

const TeamNameDiv = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;  
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`

const BadgeCustom = styled(Badge)`
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`