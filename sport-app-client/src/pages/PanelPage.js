import React, {Component} from 'react';
import GameTables from "../components/panelComponents/GameTables";
import GameEvents from "../components/panelComponents/GameEvents";
import {Col, Row} from "react-bootstrap";
import SocialPanel from "../components/panelComponents/SocialPanel";

class PanelPage extends Component {
    render() {
        return (
            <Row style={{width: '100%', margin: 0, justifyContent: 'space-between'}}>
                <Col style={{paddingLeft: "0px", paddingRight: "5px"}}>
                    <SocialPanel />
                </Col>
                <Col md='2' style={{paddingLeft: "0px", paddingRight: "5px"}}>
                    <GameEvents {...this.props}/>
                </Col>
                <Col md='2' style={{padding: "0px"}}>
                    <GameTables {...this.props}/>
                </Col>
            </Row>
        );
    }
}

export default PanelPage;