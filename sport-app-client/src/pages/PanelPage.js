import React, {Component} from 'react';
import GameTables from "../components/panelComponents/GameTables";
import GameEvents from "../components/panelComponents/GameEvents";
import {Col, Row} from "react-bootstrap";

class PanelPage extends Component {
    render() {
        return (
            <Row>
                <Col md="auto">
                    <GameEvents {...this.props}/>
                </Col>
                <Col md="auto">
                    <GameTables {...this.props}/>
                </Col>
            </Row>
        );
    }
}

export default PanelPage;