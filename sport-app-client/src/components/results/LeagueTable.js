import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import {
  Hidden,
  Table,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {getTableSoccer} from "../../util/apiUtils/TablesUtils";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import {TableNarrowCell, TableNumberCell} from "../../styles/tableStyles";

export const LeagueTable = (props) => {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let leagueId = 1;
    if (props.league) {
      leagueId = props.league.id;
    }
    getTableSoccer(leagueId)
    .then(fetchedTeams => {
      fetchedTeams.sort(compare);
      setTeams(fetchedTeams);
    })
    .catch(error => {
      console.log(new Error("Could not fetch teams data"))
    })
  }, [props.league])

  function compare(a, b) {
    if (a.total < b.total) {
      return 1;
    }
    if (a.total > b.total) {
      return -1;
    }
    return 0;
  }

  return (
      <Grid item>
        <TableContainer component={Paper}>
          <Hidden smUp>
            <Table>
              <TableHead>
                <TableRow>
                  <TableNumberCell>
                    #
                  </TableNumberCell>
                  <TableNarrowCell>Drużyna</TableNarrowCell>
                  <TableCell align='center'>RM</TableCell>
                  <TableNarrowCell align='center'>W</TableNarrowCell>
                  <TableNarrowCell align='center'>R</TableNarrowCell>
                  <TableNarrowCell align='center'>P</TableNarrowCell>
                  <TableCell align='center'>Pkt.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team, index) => (
                    <TableRow key={index}>
                      <TableNumberCell>
                        {index + 1}.
                      </TableNumberCell>
                      <TableNarrowCell>{team.name}</TableNarrowCell>
                      <TableNarrowCell
                          align='center'>{team.played}</TableNarrowCell>
                      <TableNarrowCell align='center'>{team.win}</TableNarrowCell>
                      <TableNarrowCell
                          align='center'>{team.draw}</TableNarrowCell>
                      <TableNarrowCell
                          align='center'>{team.loss}</TableNarrowCell>
                      <TableNarrowCell
                          align='center'>{team.total}</TableNarrowCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </Hidden>
          <Hidden only='xs'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    #
                  </TableCell>
                  <TableCell>Drużyna</TableCell>
                  <TableCell align='center'>RM</TableCell>
                  <TableCell align='center'>W</TableCell>
                  <TableCell align='center'>R</TableCell>
                  <TableCell align='center'>P</TableCell>
                  <TableCell align='center'>Pkt.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {index + 1}.
                      </TableCell>
                      <TableCell>{team.name}</TableCell>
                      <TableCell
                          align='center'>{team.played}</TableCell>
                      <TableCell align='center'>{team.win}</TableCell>
                      <TableCell
                          align='center'>{team.draw}</TableCell>
                      <TableCell
                          align='center'>{team.loss}</TableCell>
                      <TableCell
                          align='center'>{team.total}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </Hidden>
        </TableContainer>
      </Grid>

  );
};