import React, {Component} from 'react';
import styled from "styled-components";

import Tables from "./Tables";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";

class GameTables extends Component {

  render() {
    return (
        <CardCustom>
          <CardHeader style={{justifyContent: 'center'}}>
            Tabele
          </CardHeader>
          <CardBody style={{padding: "8px"}}>
            <Tables {...this.props}/>
          </CardBody>
        </CardCustom>
    );
  }
}

export default GameTables;

const CardCustom = styled(Card)`
  background: ${theme.colors.background};
  justify-content: flex-start;
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`