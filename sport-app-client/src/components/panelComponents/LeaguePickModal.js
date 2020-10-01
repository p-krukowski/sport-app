import React, {Component} from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFoot,
  ModalHeader
} from "../common/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../common/Button";
import {
  getAllLeaguesByDiscipline,
  setPanelLeagues
} from "../../util/apiUtils/LeaguesUtils";
import ButtonActive from "../common/ButtonActive";

class LeaguePickModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show,
      userLeaguesIds: this.props.leagues.length !== 0 ?
          this.props.leagues.map(this.mapToId) : [],
      leaguesReady: false
    }
  }

  mapToId(league) {
    return league.id;
  }

  getLeaguesByDiscipline = (discipline) => {
    getAllLeaguesByDiscipline(discipline)
    .then(response => {
      this.setState({
        leagues: response,
        leaguesReady: true
      });
    });
  }

  handleSportButton(discipline) {
    this.getLeaguesByDiscipline(discipline);
  }

  handleLeagueButton = (leagueId) => {
    let leaguesIds = this.state.userLeaguesIds;
    if (!leaguesIds.includes(leagueId)) {
      leaguesIds.push(leagueId)
    } else {
      for (let i = 0; i < leaguesIds.length; i++) {
        if (leagueId === leaguesIds[i]) {
          leaguesIds.splice(i, 1);
        }
      }
    }
    this.setState({
      userLeaguesIds: leaguesIds
    })
  }

  handleSave = () => {
    setPanelLeagues(this.state.userLeaguesIds)
    .then(response => {
      window.location.reload();
    })
    this.setState({
      leaguesReady: false
    })
    this.props.handleModal();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.show !== this.props.show) {
      this.setState({
        show: this.props.show,
        userLeaguesIds: this.props.leagues.length !== 0 ?
            this.props.leagues.map(this.mapToId) : []
      })
    }
  }

  render() {
    const {show, leaguesReady, leagues, userLeaguesIds} = this.state;
    return (
        show &&
        <Modal>
          <ModalContent>
            <ModalHeader>
              <span>Wybierz sport</span>
              <CloseIcon fontSize="large"
                         onClick={() => {
                           this.setState({
                             leaguesReady: false
                           });
                           this.props.handleModal();
                         }}
                         style={{cursor: 'pointer'}}/>
            </ModalHeader>
            <ModalBody>
              {
                !leaguesReady ?
                    <>
                      <Button onClick={() => this.handleSportButton('soccer')}>
                        Piłka nożna
                      </Button>
                      <Button disabled
                              onClick={this.handleSportButton}>Siatkówka</Button>
                      <Button disabled
                              onClick={this.handleSportButton}>Koszykówka</Button>
                      <Button disabled onClick={this.handleSportButton}>Futbol
                        Amerykański</Button>
                      <Button disabled onClick={this.handleSportButton}>Sztuki
                        Walki</Button>
                    </>
                    :
                    leagues.map(league => (
                        userLeaguesIds.includes(league.id) ?
                            <ButtonActive key={league.id}
                                          onClick={() => this.handleLeagueButton(
                                              league.id)}>
                              {league.name}
                            </ButtonActive>
                            :
                            <Button key={league.id}
                                    onClick={() => this.handleLeagueButton(
                                        league.id)}>
                              {league.name}
                            </Button>
                    ))
              }
            </ModalBody>
            <ModalFoot>
              {
                leaguesReady &&
                <Button onClick={() => this.setState({leaguesReady: false})}>
                  Wróć
                </Button>
              }
              <Button onClick={this.handleSave}>Zapisz</Button>
            </ModalFoot>
          </ModalContent>
        </Modal>
    );
  }
}

export default LeaguePickModal;