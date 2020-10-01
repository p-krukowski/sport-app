import React, {Component} from "react";
import styled from "styled-components";
import {
  DDList,
  DDListOption,
  DDListOptions,
  DDListSelected
} from "../common/DropdownList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class LeaguesDDList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      league: this.props.league,
      showDDList: this.props.showDDList,
      leagues: this.props.leagues
    }
  }

  handleList = () => {
    this.setState({
      showDDList: !this.state.showDDList
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({
        league: this.props.league,
        showDDList: false,
        leagues: this.props.leagues
      })
    }
  }

  render() {
    const {league, showDDList, leagues} = this.state;
    return (
        <LeaguesDDListLayout>
          <DDListSelected onClick={this.handleList}>
            <span>{league.name}</span>
            <ArrowDropDownIcon/>
          </DDListSelected>
          <DDListOptions>
            {
              showDDList &&
              leagues.map(league => (
                  <DDListOption key={league.id}
                                onClick={() => this.props.setLeague(league)}>
                    {league.name}
                  </DDListOption>
              ))
            }
          </DDListOptions>
        </LeaguesDDListLayout>
    );
  }
}

export default LeaguesDDList;

const LeaguesDDListLayout = styled(DDList)`
  width: 100%;
  
  @media only screen and (min-width: 786px) {
   width: 45%;
   min-width: 200px;
  }
`