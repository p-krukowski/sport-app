import React, {Component} from "react";
import styled from "styled-components";
import {Card, CardBody, CardHeader} from "../common/CardC";
import Button from "../common/Button";
import SportDataCard from "./SportDataCard";
import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import LeaguesDDList from "./LeaguesDDList";

class SportPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isComponentReady: false
    }
  }

  handleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  getUserLeagues = () => {
    fetchUserLeagues()
    .then(response => {
      this.setState({
        leagues: response,
        league: response[0],
        isComponentReady: true,
        showDDList: false
      })
    })
  }

  fetchData = () => {
    if (this.props.isAuthenticated) {
      this.getUserLeagues();
    } else {
      getAllLeaguesByDiscipline("soccer")
      .then(response => {
        this.setState({
          leagues: response,
          league: response[0],
          isComponentReady: true
        })
      })
    }
  }

  setLeague = (league) => {
    this.setState({
      league: league
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
        this.state.isComponentReady &&
        <SportPanelLayout>
          <Card style={{justifyContent: 'flex-start', marginBottom: 0}}>
            {
              this.props.isAuthenticated && this.state.leagues.length !== 0 ?
                  <CardHeader>
                    <div>Moje ligi</div>
                    <Button onClick={this.handleModal}>
                      Zmień
                    </Button>
                  </CardHeader>
                  :
                  <CardHeader>
                    <div>Wyniki</div>
                  </CardHeader>
            }

            <CardBodySportPanel>
              {
                this.state.leagues.length === 0 ?
                    <ButtonAdjusted onClick={this.handleModal}>
                      <span>+</span><br/>
                      <span>Dodaj ligi</span>
                    </ButtonAdjusted>
                    :
                    <>
                      <LeaguesDDList league={this.state.league}
                                     showDDList={this.state.showDDList}
                                     leagues={this.state.leagues}
                                     setLeague={this.setLeague}/>
                      <SportDataCard {...this.props}
                                     league={this.state.league}/>
                    </>
              }

            </CardBodySportPanel>
          </Card>
          <LeaguePickModal show={this.state.isModalVisible}
                           handleModal={this.handleModal}
                           leagues={this.state.leagues}/>
        </SportPanelLayout>
    );
  }
}

export default SportPanel;

const SportPanelLayout = styled.div`
  display: flex;
  position: relative;
  
  @media only screen and (min-width: 768px) {
    width: 35%;
  }
`

const ButtonAdjusted = styled(Button)`
  width: 100%;
  height: 100%;
`

const CardBodySportPanel = styled(CardBody)`
  align-items: center;
  padding: 5px;
  overflow: auto;
  height: 100%;
`