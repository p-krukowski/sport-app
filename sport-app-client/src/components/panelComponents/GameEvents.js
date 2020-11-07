import React, {Component} from 'react';

import RecentEvents from "./RecentEvents";
import NextEvents from "./NextEvents";
import {
  CardBodyStyled,
  CardHeaderStyled,
  CardStyled
} from "../../styles/panel/gameEventsStyles";

class GameEvents extends Component {
  render() {
    return (
        <CardStyled>
          <CardHeaderStyled>
            Spotkania
          </CardHeaderStyled>
          <CardBodyStyled>
            <span>Ostatnie</span>
            <RecentEvents {...this.props}/>
            <span>Najbliższe</span>
            <NextEvents {...this.props}/>
          </CardBodyStyled>
        </CardStyled>
    );
  }
}

export default GameEvents;