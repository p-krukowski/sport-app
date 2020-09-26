import React, {Component} from 'react';
import styled from "styled-components";
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
        <TableCustom>
          <THead style={{background: theme.colors.navbar}}>
            <TR>
              <TD style={{width: '3.5em', paddingRight: 0}}>#</TD>
              <TDCustom>Drużyna</TDCustom>
              <TD style={{width: '2.5em'}}>M</TD>
              <TD style={{width: '2.5em'}}>P</TD>
            </TR>
          </THead>
          <TBody style={{width: '100%'}}>
            {
              this.state.teams.map((team, index) => (
                  <TR key={index}>
                    <TD style={{width: '3.5em', paddingRight: 0}}>{index + 1}.</TD>
                    <TDCustom>{team.name}</TDCustom>
                    <TD style={{width: '2.5em'}}>{team.played}</TD>
                    <TD style={{width: '2.5em'}}>{team.total}</TD>
                  </TR>
              ))
            }
          </TBody>
        </TableCustom>
    );
  }
}

export default TableSoccer;

const TDCustom = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;  
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`