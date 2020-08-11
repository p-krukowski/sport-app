import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LeaguePickList from "./LeaguePickList";
import {setPanelLeagues} from "../../util/apiUtils/LeaguesUtils";

class LeaguePickModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'disciplines'
        }
    }

    changePage = (page) => {
        this.setState({
            page: page
        })
    }

    updateUserLeagues = (leagues) => {
        this.setState({
            userLeagues: leagues
        })
    }

    getLeaguesIdsFromLeagues(leagues) {
        let leaguesIds = [];
        for (let league of leagues) {
            leaguesIds.push(league.id);
        }
        return leaguesIds;
    }

    saveLeagues() {
        setPanelLeagues(this.getLeaguesIdsFromLeagues(this.state.userLeagues))
            .then(response => {
                this.props.setModalShow(false);
                this.changePage('disciplines')
                this.props.getUserLeagues();
            })
    }

    render() {
        return (
            <Modal centered
                   show={this.props.show}
                   onHide={() => {
                       this.changePage('disciplines');
                       this.props.setModalShow(false);
                   }} >
                <Modal.Header closeButton>
                    {
                        this.state.page === 'disciplines' &&
                        <Modal.Title style={{color: 'black'}}>Wybierz dyscyplinę</Modal.Title>
                    }
                    {
                        this.state.page === 'leagues' &&
                        <Modal.Title style={{color: 'black'}}>Wybierz ligę</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    <LeaguePickList page={this.state.page}
                                    changePage={this.changePage}
                                    userLeagues={this.props.userLeagues}
                                    updateUserLeagues={this.updateUserLeagues}/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.page !== 'disciplines' &&
                        <Button variant="secondary"
                                onClick={() => this.changePage('disciplines')}>
                            Wróć
                        </Button>
                    }
                    <Button variant="primary" onClick={() => this.saveLeagues()}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LeaguePickModal;