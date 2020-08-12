import React, {Component} from 'react';
import {Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import TableSoccer from "./TableSoccer";

class Tables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLeague: this.props.leagues[0]
        };
    }

    changeTable = (id) => {
        for (let league of this.props.leagues) {
            if (league.id == id) {
                this.setState({
                    currentLeague: league
                });
            }
        }
    }

    render() {
        return (
            <>
                <Row style={{textAlign: "center"}}>
                    <Col>
                        {
                            <b>{this.state.currentLeague.discipline}</b>
                        }
                        <br/>
                    </Col>
                </Row>
                <Row style={{textAlign: "center"}}>
                    <Col>
                        <DropdownButton size='sm'
                                        id="dropdown-basic-button"
                                        title={this.state.currentLeague.name}>
                            {
                                this.props.leagues.map(league => (
                                    <Dropdown.Item key={league.id}
                                                   eventKey={league.id}
                                                   onSelect={id => this.changeTable(id)}>
                                        {league.name}
                                    </Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    </Col>
                </Row>
                <Row style={{justifyContent: "center"}}>
                    {
                        <TableSoccer league={this.state.currentLeague}/>
                    }
                </Row>
            </>
        );
    }
}

export default Tables;
