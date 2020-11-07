import React, {Component} from "react";
import GameEvents from "./GameEvents";
import GameTables from "./GameTables";
import {SportDataCardLayout} from "../../styles/panel/sportDataCardStyles";

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