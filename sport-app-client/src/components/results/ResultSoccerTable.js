import React, {Component} from "react";
import {getTableSoccer} from "../../util/apiUtils/TablesUtils";
import {TableCustom, TBody, TD, THead, TR} from "../common/TableCustom";

class ResultSoccerTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isComponentReady: false
        }
    }

    fetchSoccerTable = (id) => {
        getTableSoccer(id)
            .then(response => {
                this.setState({
                    teamsScore: response,
                    isComponentReady: true
                })
            })
    }

    componentDidMount() {
        this.fetchSoccerTable(this.props.league.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.league !== prevProps.league) {
            this.fetchSoccerTable(this.props.league.id);
        }
    }

    render() {
        return (
            this.state.isComponentReady &&
            <TableCustom>
                <THead>
                    <TR>
                        <TD>#</TD>
                        <TD style={{textAlign: 'left'}}>Zespół</TD>
                        <TD>Punkty</TD>
                        <TD>W</TD>
                        <TD>R</TD>
                        <TD>P</TD>
                        <TD style={{borderTopRightRadius: '5px'}}>Bramki</TD>
                    </TR>
                </THead>
                <TBody>
                {
                    this.state.teamsScore.map((team, index) => (
                        <TR key={index}>
                            <TD>{index + 1}</TD>
                            <TD style={{textAlign: 'left'}}>{team.name}</TD>
                            <TD>{team.total}</TD>
                            <TD>{team.win}</TD>
                            <TD>{team.draw}</TD>
                            <TD>{team.loss}</TD>
                            <TD>{team.goalsFor} : {team.goalsAgainst}</TD>
                        </TR>

                    ))
                }
                </TBody>
            </TableCustom>
        );
    }
}

export default ResultSoccerTable;
