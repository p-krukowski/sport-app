import React, {Component} from "react";
import styled from "styled-components";

import {TableCustom, TBody, TD, TFoot, THead, TR} from "../common/TableCustom";

class CloseSoccerEvents extends Component {

    render() {
        return (
            <CloseSoccerEventsLayout>
                <TableOutside>
                    <p>Ostatnie</p>
                    <TableCustom>
                        <THead>
                            <TR>
                                <TD>Data</TD>
                                <TD>Gospodarze</TD>
                                <TD style={{padding: "0"}}>Wynik</TD>
                                <TD>Goście</TD>
                            </TR>
                        </THead>
                        <TBody>
                            {
                                this.props.lastEvents.map((event, index) => (
                                    <TR key={index}>
                                        <TD>{event.date}</TD>
                                        <TD style={{textAlign: 'right'}}>{event.homeTeamName}</TD>
                                        <TD style={{padding: "0"}}>{event.homeScore} : {event.awayScore}</TD>
                                        <TD style={{textAlign: 'left'}}>{event.awayTeamName}</TD>
                                    </TR>
                                ))
                            }
                        </TBody>
                    </TableCustom>
                </TableOutside>
                <TableOutside>
                    <p>Najbliższe</p>
                    <TableCustom>
                        <THead>
                            <TR>
                                <TD>Data</TD>
                                <TD>Gospodarze</TD>
                                <TD style={{padding: "0"}}>Wynik</TD>
                                <TD>Goście</TD>
                            </TR>
                        </THead>
                        <TBody>
                            {
                                this.props.nextEvents.map((event, index) => (
                                    <TR key={index}>
                                        <TD>{event.date}</TD>
                                        <TD>{event.homeTeamName}</TD>
                                        <TD>{event.homeScore} : {event.awayScore}</TD>
                                        <TD>{event.awayTeamName}</TD>
                                    </TR>
                                ))
                            }
                        </TBody>
                        <TFoot>
                            <TR>
                                <TD colSpan={4}>Brak</TD>
                            </TR>
                        </TFoot>
                    </TableCustom>
                </TableOutside>
            </CloseSoccerEventsLayout>
        );
    }
}

export default CloseSoccerEvents;

const CloseSoccerEventsLayout = styled.div`
  display: flex;
  flex-direction: column;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const TableOutside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`
