import React, {Component} from 'react';

import EventSoccer from "./EventSoccer";
import {fetchRecentEventsByLeagueId} from "../../util/apiUtils/EventsUtils";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentReady: false
    }
  }

  fetchEvents = () => {
    fetchRecentEventsByLeagueId(this.props.league.id)
    .then(response => {
      this.setState({
        recentEvents: response,
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
        this.state.recentEvents.map((event, index) => (
            <EventSoccer key={index}
                         event={event}/>
        ))
    );
  }
}

export default Events;