import React, {Component} from 'react';
import styled from "styled-components";

import Events from "./Events";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";

class GameEvents extends Component {
    render() {
        return (
            <CardCustom>
                <CardHeader style={{justifyContent: 'center'}}>
                  Wyniki
                </CardHeader>
                <CardBody style={{padding: "5px"}}>
                    <Events {...this.props}/>
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
  }
`