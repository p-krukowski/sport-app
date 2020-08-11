import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";

class LeaguePickList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userLeagues: this.props.userLeagues
        }
    }


    getLeaguesByDiscipline = (discipline) => {
        getAllLeaguesByDiscipline(discipline)
            .then(response => {
                this.setState({
                    leagues: response,
                    leaguesReady: true
                });
                this.props.changePage('leagues');
            });
    }

    hasUserTheLeague(league) {
        for(let userLeague of this.state.userLeagues) {
            if (userLeague.id == league.id) {
                return true;
            }
        }
        return false;
    }

    addLeague = (league) => {
        let userLeagues = [
            league,
            ...this.state.userLeagues
        ]
        this.setState({
            userLeagues: [
                league,
                ...this.state.userLeagues
            ]
        });
        this.props.updateUserLeagues(userLeagues);
    }

    removeLeague = (league) => {
        let tempLeagues= [];
        for(let userLeague of this.state.userLeagues) {
            if (league.id !== userLeague.id) {
                tempLeagues.push(userLeague);
            }
        }
        this.setState({
            userLeagues: tempLeagues
        });
        this.props.updateUserLeagues(tempLeagues);
    }

    render() {
        return (
            <>
                {
                    this.props.page === 'disciplines' &&
                        <React.Fragment>
                            <Button size="lg"
                                    style={{margin: "5px"}}
                                    name="soccer"
                                    onClick={e => this.getLeaguesByDiscipline(e.target.name)}>
                                Piłka nożna</Button>
                            <Button disabled size="lg" style={{margin: "5px"}} name="basketball">
                                Koszykówka</Button>
                            <Button disabled size="lg" style={{margin: "5px"}} name="volleyball">
                                Siatkówka</Button>
                            <Button disabled size="lg" style={{margin: "5px"}} name="football">
                                Futbol Amerykański</Button>
                        </React.Fragment>
                }
                {
                    this.props.page === 'leagues' && this.state.leaguesReady &&
                        this.state.leagues.map((league, index) => (
                            <ButtonGroup key={index} style={{margin: "5px"}}>
                                <Button size="lg"
                                        disabled={this.hasUserTheLeague(league)}
                                        onClick={() => this.addLeague(league)}>
                                    {league.name}
                                </Button>
                                {
                                    <Button size="lg"
                                            variant='secondary'
                                            style={{padding: '4px'}}
                                            disabled={!this.hasUserTheLeague(league)}
                                            onClick={() => this.removeLeague(league)}>
                                        <p style={{fontSize: '15px', marginTop: '0px'}}>x</p>
                                    </Button>
                                }
                            </ButtonGroup>
                        ))
                }

            </>
        );
    }
}

export default LeaguePickList;