import React, {Component} from "react";
import styled from "styled-components";
import {Card, CardBody, CardHeader} from "../common/CardC";
import Button from "../common/Button";
import SportDataCard from "./SportDataCard";
import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import {
  DDList,
  DDListOption,
  DDListOptions,
  DDListSelected
} from "../common/DropdownList";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
    this.handleList();
    this.setState({
      league: league
    })
  }

  handleList = () => {
    this.setState({
      showDDList: !this.state.showDDList
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
              this.props.isAuthenticated ?
                  <CardHeader>
                    <div>Moje ligi</div>
                    <Button onClick={this.handleModal}>
                      Zmień
                    </Button>
                  </CardHeader>
                  :
                  <CardHeader>
                    <div>Ligi</div>
                  </CardHeader>
            }

            <CardBody style={{alignItems: 'center', padding: '5px'}}>
              {
                this.state.leagues.length === 0 ?
                    <Button>+</Button>
                    :
                    <>
                      <DDListCustom>
                        <DDListSelected onClick={this.handleList}>
                          <span>{this.state.league.name}</span>
                          <ArrowDropDownIcon/>
                        </DDListSelected>
                        <DDListOptions>
                          {
                            this.state.showDDList &&
                            this.state.leagues.map(league => (
                                <DDListOption key={league.id}
                                              onClick={() => this.setLeague(league)}>
                                  {league.name}
                                </DDListOption>
                            ))
                          }
                        </DDListOptions>
                      </DDListCustom>
                      <SportDataCard {...this.props}
                                     league={this.state.league}/>
                    </>
              }

            </CardBody>
          </Card>
          <LeaguePickModal show={this.state.isModalVisible}
                           handleModal={this.handleModal}/>
        </SportPanelLayout>
    );
  }
}

export default SportPanel;

const SportPanelLayout = styled.div`
  display: flex;
  position: relative;
`

const DDListCustom = styled(DDList)`
  width: 100%;
  
  @media only screen and (min-width: 786px) {
   width: 45%;
  }
`