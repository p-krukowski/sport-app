import React, {Component} from 'react';

import Tables from "./Tables";
import {
  CardBodyStyled,
  CardHeaderStyled,
  CardStyled
} from "../../styles/panel/gameTablesStyles";

class GameTables extends Component {

  render() {
    return (
        <CardStyled>
          <CardHeaderStyled>
            Tabele
          </CardHeaderStyled>
          <CardBodyStyled>
            <Tables {...this.props}/>
          </CardBodyStyled>
        </CardStyled>
    );
  }
}

export default GameTables;