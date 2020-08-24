import React, {Component} from "react";
import styled from "styled-components";
import {fetchEventsByLeagueIdAndRoundNr} from "../../util/apiUtils/EventsUtils";
import {TableCustom, TBody, TD, THead, TR} from "../common/TableCustom";
import Button from "../common/Button";

class SoccerEventsRounds extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rounds: [],
            roundEvents: null
        }
    }


    updateRounds(roundsAmount) {
        let rounds = [];
        for (let i = 1; i <= roundsAmount; i++) {
            rounds.push(i);
        }
        this.setState({
            rounds: rounds,
            roundEvents: null
        });
    }

    handleRoundClick = roundNr => {
        fetchEventsByLeagueIdAndRoundNr(this.props.leagueId, roundNr)
            .then(response => {
                this.setState({
                    roundEvents: response,
                    roundNr: roundNr
                })
            })
    }

    componentDidMount() {
        this.updateRounds(this.props.roundsAmount);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.roundsAmount !== prevProps.roundsAmount) {
            this.updateRounds(this.props.roundsAmount);
        }
    }

    render() {
        return (
            <SoccerEventsRoundsLayout>
                <RoundsList>
                    {
                        this.state.rounds.map(roundNr => (
                            <Button key={roundNr}
                                    name={roundNr}
                                    onClick={(e) => this.handleRoundClick(e.target.name)}
                                    style={{width: '2em'}}>
                                {roundNr}
                            </Button>
                        ))
                    }
                </RoundsList>
                {
                    this.state.roundEvents !== null &&
                    <TableCustom>
                        <THead>
                            <TR>
                                <TD colSpan={4}>Kolejka {this.state.roundNr}</TD>
                            </TR>
                            <TR>
                                <TD>Data</TD>
                                <TD>Gospodarze</TD>
                                <TD style={{padding: "0"}}>Wynik</TD>
                                <TD>Goście</TD>
                            </TR>
                        </THead>
                        <TBody>
                            {
                                this.state.roundEvents.map((event, index) => (
                                    <TR key={index}>
                                        <TD>{event.date}</TD>
                                        <TD style={{textAlign: 'right'}}>{event.homeTeamName}</TD>
                                        <TD style={{padding: "0"}}>{event.homeScore} : {event.awayScore}</TD>
                                        <TD style={{textAlign: 'left'}}>{event.awayTeamName}</TD>
                                    </TR>
                                ))
                            }
                        </TBody>
                    </TableCustom>
                }
            </SoccerEventsRoundsLayout>
        );
    }
}

export default SoccerEventsRounds;

const SoccerEventsRoundsLayout = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RoundsList = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
`

const RoundLink = styled.a`
  padding: 5px;
  
  :hover {
    cursor: pointer;
  }
  
  :active {
    background: white;
    color: black;
  }
`