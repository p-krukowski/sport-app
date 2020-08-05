import React, {Component} from 'react';
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import {Card, Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import TableSoccer from "./TableSoccer";
import {getLeague} from "../../util/apiUtils/LeaguesUtils";

class UserTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leagues: false,
            currentLeague: null
        };
    }

    fetchTable = id => {
        getLeague(id)
            .then(response => {
                this.setState({
                    currentLeague: response
                })
            });
    }

    changeTable = (id) => {
        this.fetchTable(id);
    }

    getUserLeagues = () => {
        fetchUserLeagues()
            .then(response => {
                this.setState({
                    leagues: response,
                    currentLeague: response[0]
                })
            });
    }

    checkIfActive = (id) => {
        return id === this.state.currentLeague.id;
    }

    componentDidMount() {
        this.getUserLeagues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getUserLeagues();
        }
    }

    render() {
        return (
            this.state.leagues &&
            <Card bg="dark">
                <Card.Header style={{paddingTop: "4px"}}>
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
                            <DropdownButton id="dropdown-basic-button" title={this.state.currentLeague.name}>
                                {
                                    this.state.leagues.map(league => (
                                        <Dropdown.Item key={league.id}
                                                       eventKey={league.id}
                                                       onSelect={id => this.changeTable(id)}
                                                       active={this.checkIfActive(league.id)}
                                        >
                                            {league.name}
                                        </Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
                    {
                        <TableSoccer league={this.state.currentLeague}/>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default UserTables;
