import React, {Component} from 'react';

import {Container} from 'react-bootstrap';
import NavigationBar from '../components/common/NavigationBar';


import AllEntries from "../components/entriesComponents/AllEntries";
import NewEntry from "../components/entriesComponents/NewEntry";
import {getCurrentUser} from "../util/apiUtils/AuthUtils";


class EntriesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false
        };
    }

    componentDidMount() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true
                });
            }).catch(error => {
                this.setState({
                });
            });
    }

    render() {
        return (
            <div>
                <NavigationBar {...this.state} />
                <Container>
                    { this.state.isAuthenticated &&
                      <NewEntry />
                    }
                    <AllEntries isAuthenticated={this.state.isAuthenticated} />
                </Container>
            </div>
        );
    }
}

export default EntriesPage;