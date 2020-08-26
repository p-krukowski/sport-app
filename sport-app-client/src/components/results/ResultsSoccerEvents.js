import React, {Component} from "react";
import styled from "styled-components";
import CloseSoccerEvents from "./CloseSoccerEvents";
import {
  fetchEventsByLeagueIdAndRoundNr,
  fetchNextEventsByLeagueId,
  fetchRecentEventsByLeagueId
} from "../../util/apiUtils/EventsUtils";
import SoccerEventsRounds from "./SoccerEventsRounds";
import {fetchRoundsAmountByLeagueId} from "../../util/apiUtils/RoundsUtils";

class ResultsSoccerEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastEvents: null,
            nextEvents: null,
            roundsAmount: null,
            roundEvents: null
        }
    }

    fetchLastSoccerEvents = (leagueId) => {
        fetchRecentEventsByLeagueId(leagueId)
            .then(response => {
                this.setState({
                    lastEvents: response
                })
            })
    }

    fetchNextSoccerEvents = (leagueId) => {
        fetchNextEventsByLeagueId(leagueId)
            .then(response => {
                this.setState({
                    nextEvents: response
                })
            })
    }

    fetchEventsByRound = (leagueId, roundNr) => {
        fetchEventsByLeagueIdAndRoundNr(leagueId, roundNr)
            .then(response => {
                this.setState({
                    roundEvents: response
                })
            })
    }

    fetchRoundsAmount = leagueId => {
        fetchRoundsAmountByLeagueId(leagueId)
            .then(response => {
                this.setState({
                    roundsAmount: response
                })
            })
    }

    componentDidMount() {
        this.fetchLastSoccerEvents(this.props.league.id);
        this.fetchNextSoccerEvents(this.props.league.id);
        this.fetchEventsByRound(this.props.league.id, 1);
        this.fetchRoundsAmount(this.props.league.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.league !== prevProps.league) {
            this.fetchLastSoccerEvents(this.props.league.id);
            this.fetchNextSoccerEvents(this.props.league.id);
            this.fetchEventsByRound(this.props.league.id, 1);
            this.fetchRoundsAmount(this.props.league.id);
        }
    }

    render() {
        const {lastEvents, nextEvents, roundEvents, roundsAmount} = this.state;
        return (
            lastEvents !== null && nextEvents !== null &&
                roundEvents !== null && roundsAmount !== null &&
            <ResultsSoccerEventsLayout>
                <CloseSoccerEvents lastEvents={lastEvents}
                                   nextEvents={nextEvents}/>
                                   Spotkania kolejki
                <SoccerEventsRounds roundEvents={roundEvents}
                                    roundsAmount={roundsAmount}
                                    leagueId={this.props.league.id}/>
            </ResultsSoccerEventsLayout>
        );
    }
}
export default ResultsSoccerEvents;

const ResultsSoccerEventsLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
