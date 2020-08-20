import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";
import {getTableSoccer} from "../../util/apiUtils/TablesUtils";


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

    render() {
        return (
            this.state.isComponentReady &&
            <ResultSoccerTableLayout>
                <TH>
                    <TD>#</TD>
                    <TD style={{textAlign: 'left'}}>Zespół</TD>
                    <TD>Punkty</TD>
                    <TD>W</TD>
                    <TD>R</TD>
                    <TD>P</TD>
                    <TD>Bramki</TD>
                </TH>
                {
                    this.state.teamsScore.map((team, index) => (
                        <TR key={index}>
                            <TD>{index+1}</TD>
                            <TD style={{textAlign: 'left'}}>{team.name}</TD>
                            <TD>{team.total}</TD>
                            <TD>{team.win}</TD>
                            <TD>{team.draw}</TD>
                            <TD>{team.loss}</TD>
                            <TD>{team.goalsFor} : {team.goalsAgainst}</TD>
                        </TR>
                    ))
                }
            </ResultSoccerTableLayout>
        );
    }
}

export default ResultSoccerTable;

const ResultSoccerTableLayout = styled.table`
`

const TH = styled.tr`
  background: ${theme.colors.navbar};
  font-weight: ${theme.font.regular};
  padding: 5px 20px;
`

const TR = styled.tr`
  background: #494949;
`
const TD = styled.td`
  padding: 0px 20px;
  text-align: center;
`