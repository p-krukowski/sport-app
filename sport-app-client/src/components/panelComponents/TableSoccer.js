import React, {Component} from 'react';
import {getBasicTableSoccer} from "../../util/apiUtils/TablesUtils";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import {TableNarrowCell, TableNumberCell} from "../../styles/tableStyles";
import Box from "@material-ui/core/Box";

class TableSoccer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: null
    }
  }

  getTable = (id) => {
    getBasicTableSoccer(id)
    .then(response => {
      response.sort(this.compare);
      this.setState({
        teams: response
      });
    });
  }

  compare(a, b) {
    if (a.total < b.total) {
      return 1;
    }
    if (a.total > b.total) {
      return -1;
    }
    return 0;
  }

  componentDidMount() {
    this.getTable(this.props.league.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.league !== this.props.league) {
      this.getTable(this.props.league.id);
    }
  }

  render() {
    return (
        this.state.teams &&
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableNumberCell>#</TableNumberCell>
                <TableNarrowCell>Drużyna</TableNarrowCell>
                <TableNarrowCell>M</TableNarrowCell>
                <TableNarrowCell>P</TableNarrowCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.teams.map((team, index) => (
                  <TableRow key={index}>
                    <TableNumberCell>
                      {index + 1}.
                    </TableNumberCell>
                    <TableNarrowCell>
                      <Box style={{width: "15ch"}}>
                        <Typography noWrap>{team.name}</Typography>
                      </Box>
                    </TableNarrowCell>
                    <TableNarrowCell>{team.played}</TableNarrowCell>
                    <TableNarrowCell>{team.total}</TableNarrowCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }
}

export default TableSoccer;