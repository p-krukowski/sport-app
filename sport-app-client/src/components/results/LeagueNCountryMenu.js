import React, {Component} from "react";
import styled from "styled-components";

class LeagueNCountryMenu extends Component {
    render() {
        return (
            <LeagueMenuLayout onMouseLeave={this.props.hideLeagueNCountryMenu}>
                {
                    this.props.leagues.map(league => (
                        <League key={league.id}
                                onClick={
                                    () => {
                                        this.props.setCurrentLeague(league);
                                        this.props.hideLeagueNCountryMenu();
                                    }}>
                            {league.name}
                        </League>
                    ))
                }
            </LeagueMenuLayout>
        );
    }
}

export default LeagueNCountryMenu;

const LeagueMenuLayout = styled.div`
  font-size: 1.8em;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  background: #292929;
`

const League = styled.button`
  padding: 10px;
  background: none;
  border: none;
  color: inherit;
  font-size: 0.5em;
  text-align: left;
    
  :hover {
    background: #393939;
  }
  :focus {
    background: #393939;
    outline: none;
  }
`