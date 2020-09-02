import React, {Component} from 'react';
import styled from "styled-components";

import {Row} from 'react-bootstrap';
import DisciplineMenu from "../components/results/DisciplineMenu";
import LeagueNCountryMenu from "../components/results/LeagueNCountryMenu";
import {getAllDisciplines} from "../util/apiUtils/DisciplinesUtils";
import {getAllLeaguesByDiscipline} from "../util/apiUtils/LeaguesUtils";
import Results from "../components/results/Results";
import {fetchUserLeagues} from "../util/apiUtils/UserUtils";

class ResultsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentReady: false,
      leagues: null,
      league: null
    }
  }

  fetchAllDisciplines = () => {
    getAllDisciplines()
    .then(response => {
      this.setState({
        disciplines: response,
        isComponentReady: true
      })
    })
  }

  fetchLeaguesByDiscipline = (discipline) => {
    getAllLeaguesByDiscipline(discipline)
    .then(response => {
      this.setState({
        leagues: response
      })
    })
  }

  setCurrentLeague = (league) => {
    this.setState({
      league: league
    })
  }

  hideLeagueNCountryMenu = () => {
    this.setState({
      leagues: null
    })
  }

  getUserLeagues = () => {
    fetchUserLeagues()
    .then(response => {
      if (response.length !== 0) {
        this.setState({
          league: response[0]
        })
      } else {
        this.getLeagues();
      }
    });
  }

  getLeagues = () => {
    getAllLeaguesByDiscipline("soccer")
    .then(response => {
      this.setState({
        league: response[0]
      })
    });
  }

  componentDidMount() {
    this.fetchAllDisciplines();
    if (this.props.isAuthenticated) {
      this.getUserLeagues();
    } else {
      this.getLeagues();
    }
  }

  render() {
    return (
        this.state.isComponentReady &&
        <Row style={{width: '100%', height: '100%', margin: 0}}>
          <ResultsMenu>
            <DisciplineMenu disciplines={this.state.disciplines}
                            fetchLeaguesByDiscipline={this.fetchLeaguesByDiscipline}/>
            {
              this.state.leagues !== null &&
              <LeagueNCountryMenu leagues={this.state.leagues}
                                  hideLeagueNCountryMenu={this.hideLeagueNCountryMenu}
                                  setCurrentLeague={this.setCurrentLeague}/>
            }
          </ResultsMenu>
          {
            this.state.league !== null &&
            <Results league={this.state.league}/>
          }
        </Row>
    );
  }
}

export default ResultsPage;

const ResultsMenu = styled.div`
  display: flex;
  flex-direction: row;
  margin: -10px 0 -10px -10px;
`