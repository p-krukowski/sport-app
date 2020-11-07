import React, {Component} from "react";
import {Card, CardHeader} from "../common/CardCustom";
import SportDataCard from "./SportDataCard";
import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import LeagueSelect from "./LeagueSelect";
import Button from "@material-ui/core/Button";
import {
  ButtonAdjusted,
  CardBodySportPanel,
  SportPanelLayout
} from "../../styles/panel/sportPanelStyles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Divider} from "@material-ui/core";

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
                    <Button
                        variant='outlined'
                        onClick={this.handleModal}
                    >
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
                    <ButtonAdjusted
                        variant='outlined'
                        onClick={this.handleModal}
                    >
                      <AddCircleOutlineIcon color='primary' fontSize='large'/>
                      <span>Dodaj ligi</span>
                    </ButtonAdjusted>
                    :
                    <>
                      <LeagueSelect league={this.state.league}
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