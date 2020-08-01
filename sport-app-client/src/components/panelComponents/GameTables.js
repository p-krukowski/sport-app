import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
import Tables from "./Tables";
import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeaguesIds} from "../../util/apiUtils/UserUtils";
import UserTables from "./UserTables";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class GameTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            league: null,
            userLeagues: null,
            hasUserLeagues: false,
            showLeaguePickModal: false,
            componentReady: false
        }
    }

    handleShowModal = () => {
        this.setState({
            showLeaguePickModal: true,
            showDisciplineList: true,
            changeDisciplineBtnVisible: false
        });
    }

    handleHideModal = () => {
        this.setState({
            showLeaguePickModal: false,
            showDisciplineList: true,
            changeDisciplineBtnVisible: false
        });
        this.getUserLeaguesIds();
    }

    getUserLeaguesIds = () => {
        fetchUserLeaguesIds()
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

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getUserLeaguesIds();
        } else {
            this.setState({
                componentReady: true
            })
        }
    }

    render() {
        return (
            this.state.componentReady &&
            <Card bg="dark" text="white" style={{width: "300px"}}>
                <Card.Header style={{padding: "3px 15px"}}>
                    <Row>
                        <Col style={{lineHeight: '38px', textAlign: 'left'}}>
                                <span style={{verticalAlign: 'middle'}}>
                                        <p style={{fontSize: '17px', margin: 0}}>Tabele</p>
                                </span>
                        </Col>
                        {
                            this.props.isAuthenticated && this.state.hasUserLeagues &&
                            <Col md="auto" style={{margin: 'auto'}}>
                                <Button size='sm' onClick={this.handleShowModal}>
                                    Zmień
                                </Button>
                            </Col>
                        }
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: "8px"}}>
                    {
                        this.props.isAuthenticated === false &&
                        <Tables/>
                    }
                    {
                        this.props.isAuthenticated && this.state.hasUserLeagues &&
                        <UserTables/>
                    }
                    {
                        this.props.isAuthenticated && this.state.hasUserLeagues === false &&
                        <Card bg="dark" style={{
                            height: "300px",
                            fontSize: '40px',
                            textAlign: 'center'
                        }}>

                            <Button variant="secondary" style={{height: '100%'}} onClick={this.handleShowModal}>
                                    <span style={{margin: 'auto'}}>
                                        <p style={{fontSize: '40px', margin: 'auto'}}>+</p>
                                        <p style={{fontSize: '15px', margin: 'auto'}}>Dodaj ligi</p>
                                    </span>
                            </Button>

                        </Card>
                    }
                    {
                        <LeaguePickModal showLeaguePickModal={this.state.showLeaguePickModal}
                                         showDisciplineList={this.state.showDisciplineList}
                                         changeDisciplineBtnVisible={this.state.changeDisciplineBtnVisible}
                                         handleHideModal={this.handleHideModal}
                        />
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default GameTables;