import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import Tables from "./Tables";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import Button from "../common/Button";

class GameTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            hasUserLeagues: false,
            componentReady: false
        }
    }

    setModalShow = (b) => {
        this.setState({
            modalShow: b
        })
    }

    getUserLeagues = () => {
        fetchUserLeagues()
            .then(response => {
                if (response.length === 0) {
                    this.setState({
                        hasUserLeagues: false,
                        componentReady: true
                    })
                } else {
                    this.setState({
                        hasUserLeagues: true,
                        userLeagues: response,
                        componentReady: true
                    })
                }
            });
    }

    getLeagues = () => {
        getAllLeaguesByDiscipline("soccer")
            .then(response => {
                this.setState({
                    leagues: response,
                    componentReady: true
                })
            });
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getUserLeagues();
        } else {
            this.getLeagues();
        }
    }

    render() {
        return (
            this.state.componentReady &&
            <Card bg="dark" text="white" style={{width: '100%'}}>
                    <Row>
                        <Col style={{lineHeight: '38px', textAlign: 'left'}}>
                                <span style={{verticalAlign: 'middle'}}>
                                        <p style={{fontSize: '17px', margin: 0}}>
                                            Tabele
                                        </p>
                                </span>
                        </Col>
                        {
                            this.props.isAuthenticated && this.state.hasUserLeagues &&
                            <Col md="auto" style={{margin: 'auto'}}>
                                <Button size='sm' onClick={() => this.setModalShow(true)}>
                                    Zmień
                                </Button>
                            </Col>
                        }
                    </Row>
                <Card.Body style={{padding: "8px"}}>
                    {
                        this.props.isAuthenticated === false &&
                        <Tables leagues={this.state.leagues} />
                    }
                    {
                        this.props.isAuthenticated && this.state.hasUserLeagues &&
                        <Tables leagues={this.state.userLeagues} />
                    }
                    {
                        this.props.isAuthenticated && this.state.hasUserLeagues === false &&
                        <Card bg="dark" style={{
                            height: "300px",
                            fontSize: '40px',
                            textAlign: 'center'
                        }}>

                            <Button variant="secondary" style={{height: '100%'}} onClick={() => this.setModalShow(true)}>
                                    <span style={{margin: 'auto'}}>
                                        <p style={{fontSize: '40px', margin: 'auto'}}>+</p>
                                        <p style={{fontSize: '15px', margin: 'auto'}}>Dodaj ligi</p>
                                    </span>
                            </Button>

                        </Card>
                    }
                    {
                        <LeaguePickModal show={this.state.modalShow}
                                         setModalShow={this.setModalShow}
                                         userLeagues={this.state.userLeagues}
                                         getUserLeagues={this.getUserLeagues}
                        />
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default GameTables;