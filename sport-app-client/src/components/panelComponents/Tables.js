import React, {Component} from 'react';
import {Card, Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import TableSoccer from "./TableSoccer";
import {getLeague} from "../../util/apiUtils/LeaguesUtils";

class Tables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            componentReady: false,
            currentLeagueId: 4328
        }
    }


    fetchTable = id => {
        getLeague(id)
            .then(response => {
                this.setState({
                    league: response,
                    componentReady: true
                })
            });
    }

    changeTable = (e) => {
        this.fetchTable(e);
    }

    componentDidMount() {
        this.fetchTable(this.state.currentLeagueId);
    }

    render() {
        return (
            this.state.componentReady &&
            <Card bg="dark">
                <Card.Header style={{paddingTop: "4px"}}>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <b>{this.state.league.discipline}</b><br/>
                        </Col>
                    </Row>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <DropdownButton id="dropdown-basic-button" title={this.state.league.name}>
                                <Dropdown.Item eventKey="4328" onSelect={id => this.changeTable(id)}>Premier League</Dropdown.Item>
                                <Dropdown.Item eventKey="4331" onSelect={id => this.changeTable(id)}>Bundesliga</Dropdown.Item>
                                <Dropdown.Item eventKey="4332" onSelect={id => this.changeTable(id)}>Serie A</Dropdown.Item>
                                <Dropdown.Item eventKey="4334" onSelect={id => this.changeTable(id)}>Ligue 1</Dropdown.Item>
                                <Dropdown.Item eventKey="4335" onSelect={id => this.changeTable(id)}>La Liga</Dropdown.Item>
                                <Dropdown.Item eventKey="4422" onSelect={id => this.changeTable(id)}>Ekstraklasa</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
                    <TableSoccer league={this.state.league}/>
                </Card.Body>
            </Card>
        );
    }
}

export default Tables;