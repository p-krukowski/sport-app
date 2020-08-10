import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LeaguePickList from "./LeaguePickList";
import {fetchUserLeaguesIds} from "../../util/apiUtils/UserUtils";
import {getAllLeaguesByDiscipline, setPanelLeagues} from "../../util/apiUtils/LeaguesUtils";

class LeaguePickModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.showLeaguePickModal,
            saveBtnDisabled: true,
            changeDisciplineBtnVisible: this.props.changeDisciplineBtnVisible,
            showDisciplineList: this.props.showDisciplineList
        }
    }

    chosenLeagues = [];

    handleHide = () => {
        this.setState({
            saveBtnDisabled: true
        });
        this.props.handleHideModal();
    }

    changeMenu = () => {
        this.setState({
            disciplineBtnVisible: false,
            showDisciplineList: true
        });
    }

    setDiscipline = (e) => {
        if (this.chosenLeagues.length === 0) {
            fetchUserLeaguesIds()
                .then(response => {
                    this.chosenLeagues = response;
                });
        }

        getAllLeaguesByDiscipline(e.target.name)
            .then(response => {
                this.setState({
                    leagues: response,
                    changeDisciplineBtnVisible: true,
                    showDisciplineList: false
                })
            });
    }

    addLeague = (e, id) => {
        this.chosenLeagues.push(id);
        this.setState({
            saveBtnDisabled: false
        });
    }

    removeLeague = (e, id) => {
        if (this.chosenLeagues.indexOf(id) !== -1) {
            this.chosenLeagues.splice(this.chosenLeagues.indexOf(id), 1);
        }
        this.setState({
            saveBtnDisabled: false
        });
    }

    isBtnDisabled = id => {
        for (let item of this.chosenLeagues) {
            if (item === id) return true;
        }
        return false;
    }

    setLeagueButtonPadding = id => {
        if (this.isBtnDisabled(id)) {
            return '8px';
        } else {
            return '16px';
        }
    }

    updatePanelLeagues = e => {
        setPanelLeagues(this.chosenLeagues)
            .then(() => {
                this.handleHide();
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                show: this.props.showLeaguePickModal,
                changeDisciplineBtnVisible: this.props.changeDisciplineBtnVisible,
                showDisciplineList: this.props.showDisciplineList
            })
        }
    }

    render() {
        return (
            <Modal centered show={this.state.show} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Wybierz dyscyplinę</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LeaguePickList showDisciplineList={this.state.showDisciplineList}
                                    setDiscipline={this.setDiscipline}
                                    leagues={this.state.leagues}
                                    addLeague={this.addLeague}
                                    removeLeague={this.removeLeague}
                                    isBtnDisabled={this.isBtnDisabled}
                                    setLeagueButtonPadding={this.setLeagueButtonPadding}/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.changeDisciplineBtnVisible &&
                        <Button variant="secondary"
                                onClick={this.changeMenu}>
                            Zmień dyscyplinę
                        </Button>
                    }

                    <Button variant="primary" disabled={this.state.saveBtnDisabled}
                            onClick={e => this.updatePanelLeagues(e)}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LeaguePickModal;