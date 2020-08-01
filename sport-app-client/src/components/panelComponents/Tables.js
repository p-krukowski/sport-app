import React, {Component} from 'react';
import {Card, Col, Nav, Row} from "react-bootstrap";
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
        this.fetchTable(e.target.name);
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
                    <Nav justify variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link name="4328" onClick={e => this.changeTable(e)}
                                      style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>PL</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link name="4331" onClick={e => this.changeTable(e)}
                                      style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>BUND</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link name="4332" onClick={e => this.changeTable(e)}
                                      style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>SA</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link name="4334" onClick={e => this.changeTable(e)}
                                      style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>F1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link name="4335" onClick={e => this.changeTable(e)}
                                      style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>LL</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link name="4422" onClick={e => this.changeTable(e)}
                                      style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>EK</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
                    <TableSoccer league={this.state.league}/>
                </Card.Body>
            </Card>
        );
    }
}

export default Tables;