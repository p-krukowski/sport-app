import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";

class LeaguePickList extends Component {

    render() {
        return (
            <React.Fragment>
                {
                    this.props.showDisciplineList ?
                        <React.Fragment>
                            <Button size="lg" style={{margin: "5px"}} name="soccer"
                                    onClick={e => this.props.setDiscipline(e)}>
                                Piłka nożna</Button>
                            <Button disabled size="lg" style={{margin: "5px"}} name="basketball">
                                Koszykówka</Button>
                            <Button disabled size="lg" style={{margin: "5px"}} name="volleyball">
                                Siatkówka</Button>
                            <Button disabled size="lg" style={{margin: "5px"}} name="football">
                                Futbol Amerykański</Button>
                        </React.Fragment>
                        :
                        this.props.leagues.map((league, index) => (
                            <ButtonGroup key={index} style={{margin: "5px"}}>
                                <Button size="lg"
                                        onClick={e => this.props.addLeague(e, league.id)}
                                        disabled={this.props.isBtnDisabled(league.id)}
                                        style={{
                                            paddingLeft: this.props.setLeagueButtonPadding(league.id),
                                            paddingRight: this.props.setLeagueButtonPadding(league.id)
                                        }}>
                                    {league.name}
                                </Button>
                                {
                                    this.props.isBtnDisabled(league.id) &&
                                    <Button size="lg"
                                            variant='secondary'
                                            onClick={e => this.props.removeLeague(e, league.id)}
                                            style={{padding: '4px'}}>
                                        <p style={{fontSize: '15px', marginTop: '0px'}}>x</p>
                                    </Button>
                                }
                            </ButtonGroup>
                        ))
                }

            </React.Fragment>
        );
    }
}

export default LeaguePickList;