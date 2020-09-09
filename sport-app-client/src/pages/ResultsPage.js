import React, {Component} from 'react';
import styled from "styled-components";

import DisciplineMenu from "../components/results/DisciplineMenu";
import LeagueNCountryMenu from "../components/results/LeagueNCountryMenu";
import {getAllDisciplines} from "../util/apiUtils/DisciplinesUtils";
import {getAllLeaguesByDiscipline} from "../util/apiUtils/LeaguesUtils";
import Results from "../components/results/Results";
import {fetchUserLeagues} from "../util/apiUtils/UserUtils";

//TODO Add phone league switch

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
        <ResultsPageLayout>
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
        </ResultsPageLayout>
    );
  }
}

export default ResultsPage;

const ResultsPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const ResultsMenu = styled.div`
  display: none;
  
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    margin: -10px 0 -10px -10px;
  }
`