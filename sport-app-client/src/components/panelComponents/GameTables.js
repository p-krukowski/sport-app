import React, {Component} from 'react';
import styled from "styled-components";

import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import Tables from "./Tables";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import Button from "../common/Button";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";

class GameTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      hasUserLeagues: false,
      componentReady: false
    }
  }

  setModalShow = (b) => {
    this.setState({
      modalShow: b
    })
  }

  getUserLeagues = () => {
    fetchUserLeagues()
    .then(response => {
      if (response.length === 0) {
        this.setState({
          hasUserLeagues: false,
          userLeagues: [],
          componentReady: true
        })
      } else {
        this.setState({
          hasUserLeagues: true,
          userLeagues: response,
          componentReady: true
        })
      }
    });
  }

  getLeagues = () => {
    getAllLeaguesByDiscipline("soccer")
    .then(response => {
      this.setState({
        leagues: response,
        componentReady: true
      })
    });
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.getUserLeagues();
    } else {
      this.getLeagues();
    }
  }

  render() {
    return (
        this.state.componentReady &&
        <CardCustom>
          <CardHeader style={{justifyContent: 'center'}}>
            Tabele
          </CardHeader>
          <CardBody style={{padding: "8px", overflow: 'scroll'}}>
            {
              !this.props.isAuthenticated &&
              <Tables leagues={this.state.leagues}/>
            }
            {
              this.props.isAuthenticated && this.state.hasUserLeagues &&
              <Tables leagues={this.state.userLeagues}/>
            }
            {
              this.props.isAuthenticated && !this.state.hasUserLeagues &&
              <Button variant="secondary" style={{height: '100%'}}
                      onClick={() => this.setModalShow(true)}>
                                    <span style={{margin: 'auto'}}>
                                        <p style={{
                                          fontSize: '40px',
                                          margin: 'auto'
                                        }}>+</p>
                                        <p style={{
                                          fontSize: '15px',
                                          margin: 'auto'
                                        }}>Dodaj ligi</p>
                                    </span>
              </Button>
            }
            {
              <LeaguePickModal show={this.state.modalShow}
                               setModalShow={this.setModalShow}
                               userLeagues={this.state.userLeagues}
                               getUserLeagues={this.getUserLeagues}
              />
            }
          </CardBody>
        </CardCustom>
    );
  }
}

export default GameTables;

const CardCustom = styled(Card)`
  background: ${theme.colors.background};
  justify-content: flex-start;
`