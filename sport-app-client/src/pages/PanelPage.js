import React, {Component} from 'react';
import GameTables from "../components/panelComponents/GameTables";
import GameEvents from "../components/panelComponents/GameEvents";
import {Col, Row} from "react-bootstrap";
import SocialPanel from "../components/panelComponents/SocialPanel";

class PanelPage extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <SocialPanel />
                </Col>
                <Col>
                    <GameEvents {...this.props}/>
                </Col>
                <Col>
                    <GameTables {...this.props}/>
                </Col>
            </Row>
        );
    }
}

export default PanelPage;