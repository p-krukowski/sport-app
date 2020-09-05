import React, {Component} from "react";
import styled from "styled-components";
import GameEvents from "./GameEvents";
import GameTables from "./GameTables";

class SportDataCard extends Component {
  render() {
    return (
        <SportDataCardLayout>
          <GameEvents {...this.props}/>
          <GameTables {...this.props}/>
        </SportDataCardLayout>
    );
  }
}

export default SportDataCard;

const SportDataCardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  @media only screen and (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
`