import Paper from "@material-ui/core/Paper";
import {Hidden, Table, TableContainer, TableRow} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {TableNarrowCell} from "../../styles/tableStyles";
import React from "react";

export const RoundEventsResults = (props) => (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {props.events.map((event, index) => (
              <TableRow key={index}>
                <Hidden only='xs'>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell align='right'>
                    {event.homeTeamName}
                  </TableCell>
                  <TableCell align='center'>
                    {event.homeScore} - {event.awayScore}
                  </TableCell>
                  <TableCell>
                    {event.awayTeamName}
                  </TableCell>
                </Hidden>
                <Hidden smUp>
                  <TableNarrowCell>{event.date}</TableNarrowCell>
                  <TableNarrowCell>{event.time}</TableNarrowCell>
                  <TableNarrowCell align='right'>
                    {event.homeTeamName}
                  </TableNarrowCell>
                  <TableNarrowCell align='center'>
                    {event.homeScore} - {event.awayScore}
                  </TableNarrowCell>
                  <TableNarrowCell>
                    {event.awayTeamName}
                  </TableNarrowCell>
                </Hidden>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);