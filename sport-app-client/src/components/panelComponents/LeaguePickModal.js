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
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";

class LeaguePickModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show,
      leaguesReady: false
    }
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

  handleSave = () => {
    this.setState({
      leaguesReady: false
    })
    this.props.handleModal();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.show !== this.props.show) {
      this.setState({
        show: this.props.show
      })
    }
  }

  render() {
    return (
        this.state.show &&
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
                !this.state.leaguesReady ?
                    <>
                      <Button onClick={() => this.handleSportButton('soccer')}>Piłka
                        nożna</Button>
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
                    this.state.leagues.map(league => (
                        <Button key={league.id}>{league.name}</Button>
                    ))
              }
            </ModalBody>
            <ModalFoot>
              {
                this.state.leaguesReady &&
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