import React, {Component} from 'react';
import styled from "styled-components";

import RecentEvents from "./RecentEvents";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";
import NextEvents from "./NextEvents";

class GameEvents extends Component {
  render() {
    return (
        <CardCustom>
          <CardHeader style={{justifyContent: 'center'}}>
            Spotkania
          </CardHeader>
          <CardBody style={{padding: "5px"}}>
            <span>Ostatnie</span>
            <RecentEvents {...this.props}/>
            <span>Najbliższe</span>
            <NextEvents {...this.props}/>
          </CardBody>
        </CardCustom>
    );
  }
}

export default GameEvents;

const CardCustom = styled(Card)`
  background: ${theme.colors.background};
  justify-content: flex-start;
  
  @media only screen and (min-width: 768px) {
    margin-right: 5px;
    width: 50%;
  }
`