import React, {Component} from 'react';

import {Col} from 'react-bootstrap';

import AllEntries from "../components/entriesComponents/AllEntries";
import NewEntry from "../components/entriesComponents/NewEntry";

class EntriesPage extends Component {

    render() {
        return (
            <Col sm='6' style={{padding: 0}}>
                {
                    this.props.isAuthenticated &&
                    <NewEntry/>
                }
                <AllEntries isAuthenticated={this.props.isAuthenticated}/>
            </Col>
        );
    }
}

export default EntriesPage;