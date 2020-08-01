import React, {Component} from 'react';
import NavigationBar from "../components/common/NavigationBar";
import GameTables from "../components/panelComponents/GameTables";
import GameEvents from "../components/panelComponents/GameEvents";
import {Col, Container, Row} from "react-bootstrap";
import {getCurrentUser} from "../util/apiUtils/AuthUtils";

class PanelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoaded: false
        };
    }

    componentDidMount() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoaded: true
                });
            }).catch(() => {
            this.setState({
                isLoaded: true
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar {...this.state} />
                {
                    this.state.isLoaded &&

                    <Container fluid style={{padding: '16px'}}>
                        <Row>
                            <Col>

                            </Col>
                            <Col md="auto">
                                <GameEvents {...this.state}/>
                            </Col>
                            <Col md="auto">
                                <GameTables {...this.state}/>
                            </Col>
                        </Row>
                    </Container>
                }
            </React.Fragment>

        );
    }
}

export default PanelPage;