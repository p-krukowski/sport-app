import React, {Component} from 'react';

import EventSoccer from "./EventSoccer";
import {fetchNextEventsByLeagueId} from "../../util/apiUtils/EventsUtils";

class NextEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentReady: false
    }
  }

  fetchEvents = () => {
    fetchNextEventsByLeagueId(this.props.league.id)
    .then(response => {
      this.setState({
        nextEvents: response,
        isComponentReady: true
      })
    })
  }

  componentDidMount() {
    this.fetchEvents();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.league !== this.props.league) {
      this.fetchEvents();
    }
  }

  render() {
    return (
        this.state.isComponentReady &&
        this.state.nextEvents.map((event, index) => (
            <EventSoccer key={index}
                         event={event}/>
        ))
    );
  }
}

export default NextEvents;