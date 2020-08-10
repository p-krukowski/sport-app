import React, {Component} from 'react';
import {Card, Table} from "react-bootstrap";
import {getTableSoccer} from "../../util/apiUtils/TablesUtils";
import CardCustom from "../common/CardCustom";

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
        getTableSoccer(id)
            .then(response => {
                this.sortTeams(response);
                this.setState({
                    teams: response
                })
            });
    }

    componentDidMount() {
        this.getTable(this.props.league.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getTable(this.props.league.id);
        }
    }

    render() {
        return (
            this.state.teams &&
            <CardCustom bg="dark" style={{borderRadius: '0', borderTopWidth: "0px"}}>
                    <Table size="sm" variant="dark" style={{marginBottom: 8, fontSize: "14px"}}>
                        <thead style={{background: "none"}}>
                        <tr>
                            <th>#</th>
                            <th>Drużyna</th>
                            <th>M</th>
                            <th>P</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.teams.map((team, index) => (
                                <tr key={index}>
                                    <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{index + 1}.</td>
                                    <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{team.name}</td>
                                    <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{team.played}</td>
                                    <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{team.total}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
            </CardCustom>
        );
    }
}

export default TableSoccer;