import React, {Component} from 'react';
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import {Card, Col, Nav, Row} from "react-bootstrap";
import TableSoccer from "./TableSoccer";

class UserTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leagues: false,
            currentLeague: null
        };
    }

    changeTable = (league) => {
        this.setState({
            currentLeague: league
        })
    }

    getUserLeagues = () => {
        fetchUserLeagues()
            .then(response => {
                this.setState({
                    leagues: response,
                    firstLeague: response[0]
                })
            });
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
                                <b>{this.state.firstLeague.discipline}</b>
                            }
                            <br/>
                        </Col>
                    </Row>
                    <Nav justify variant="tabs" defaultActiveKey={'#' + this.state.firstLeague.name}>
                        {
                            this.state.leagues.map(league => (
                                <Nav.Link href={'#' + league.name}
                                          key={league.id}
                                          name={league.name}
                                          onClick={e => this.changeTable(league)}
                                          style={{
                                              padding: "5px",
                                              paddingTop: "3px",
                                              paddingBottom: "3px"
                                          }}>
                                    {league.name}
                                </Nav.Link>
                            ))
                        }
                    </Nav>
                </Card.Header>
                <Card.Body style={{padding: "0"}}>
                    {
                        this.state.currentLeague ?
                            <TableSoccer league={this.state.currentLeague}/>
                            :
                            <TableSoccer league={this.state.firstLeague}/>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default UserTables;
