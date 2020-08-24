import React, {Component} from 'react';
import {getBasicTableSoccer} from "../../util/apiUtils/TablesUtils";
import CardCustom from "../common/CardCustom";
import {TableCustom, TBody, TD, THead, TR} from "../common/TableCustom";

class TableSoccer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: null
        }
    }

    sortTeams = (teams) => {
        teams.sort((a, b) => (a.total > b.total) ? -1 : (a.total === b.total) ? ((a.goalsFor > b.goalsFor) ? -1 : 1) : 1)
    }

    getTable = (id) => {
        getBasicTableSoccer(id)
            .then(response => {
              //  this.sortTeams(response);
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
            <CardCustom bg="dark" style={{width: '100%', borderRadius: '0', borderTopWidth: "0px"}}>
                <TableCustom style={{width: "100%", overflow: "scroll"}}>
                    <THead style={{background: "none"}}>
                    <TR>
                        <TD>#</TD>
                        <TD>Drużyna</TD>
                        <TD>M</TD>
                        <TD>P</TD>
                    </TR>
                    </THead>
                    <TBody>
                    {
                        this.state.teams.map((team, index) => (
                            <TR key={index}>
                                <TD style={{paddingTop: "0px", paddingBottom: "0px"}}>{index + 1}.</TD>
                                <TD style={{paddingTop: "0px", paddingBottom: "0px"}}>{team.name}</TD>
                                <TD style={{paddingTop: "0px", paddingBottom: "0px"}}>{team.played}</TD>
                                <TD style={{paddingTop: "0px", paddingBottom: "0px"}}>{team.total}</TD>
                            </TR>
                        ))
                    }
                    </TBody>
                </TableCustom>
            </CardCustom>
        );
    }
}

export default TableSoccer;