import React, {useEffect} from "react";
import {Table, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {TableNarrowCell} from "../../styles/tableStyles";
import TableBody from "@material-ui/core/TableBody";

export const EventsResults = (props) => {

  useEffect(() => {

  }, [props.events])

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableNarrowCell
                  colSpan={5}
                  align='center'>
                {props.title}
              </TableNarrowCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.events.map((event, index) => (
                <TableRow key={index}>
                  <TableNarrowCell>{event.date}</TableNarrowCell>
                  <TableNarrowCell>{event.time}</TableNarrowCell>
                  <TableNarrowCell
                      style={{maxWidth: '9ch'}}
                      align='right'>
                    {event.homeTeamName}
                  </TableNarrowCell>
                  <TableNarrowCell align='center'>
                    {event.homeScore} - {event.awayScore}
                  </TableNarrowCell>
                  <TableNarrowCell style={{maxWidth: '9ch'}}>
                    {event.awayTeamName}
                  </TableNarrowCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}