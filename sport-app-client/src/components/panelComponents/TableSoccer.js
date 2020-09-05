import React, {Component} from 'react';
import {getBasicTableSoccer} from "../../util/apiUtils/TablesUtils";
import {TableCustom, TBody, TD, THead, TR} from "../common/TableCustom";
import {theme} from "../../util/theme";

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
      this.setState({
        teams: response
      })
    });
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
        <TableCustom style={{
          width: "100%",
          overflow: "scroll"}}>
          <THead style={{background: theme.colors.navbar}}>
            <TR style={{marginBottom: '3px'}}>
              <TD>#</TD>
              <TD style={{textAlign: 'left'}}>Drużyna</TD>
              <TD>M</TD>
              <TD>P</TD>
            </TR>
          </THead>
          <TBody>
            {
              this.state.teams.map((team, index) => (
                  <TR key={index}>
                    <TD>{index + 1}.</TD>
                    <TD style={{textAlign: 'left'}}>{team.name}</TD>
                    <TD>{team.played}</TD>
                    <TD>{team.total}</TD>
                  </TR>
              ))
            }
          </TBody>
        </TableCustom>
    );
  }
}

export default TableSoccer;