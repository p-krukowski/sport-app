import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";
import {
  BadgeCustom,
  EventSoccerLayout, ResultBadge,
  ResultRow,
  TeamNameDiv
} from "../../styles/panel/eventSoccerStyles";
import {getDateTimeAsText} from "../../util/timeFormat";

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
          date: getDateTimeAsText(this.props.event.dateTime,
              this.props.event.date)
        }
      })
    } else {
      this.setState({
        event: {
          ...this.props.event,
          date: getDateTimeAsText(this.props.event.dateTime,
              this.props.event.date)
        }
      })
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