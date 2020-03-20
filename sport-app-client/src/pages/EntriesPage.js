import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import NewEntry from '../components/NewEntry';
import AllEntries from '../components/AllEntries';
import NavigationBar from '../components/common/NavigationBar';

import {getCurrentUser} from '../util/APIUtils';


export default class EntriesPage extends Component {
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
            });;
    }

    render() {
        return (
            <div>
                <NavigationBar {...this.state} />
                <Container>
                    { this.state.isAuthenticated &&
                      <NewEntry />
                    }
                    <AllEntries />
                </Container>
            </div>
        );
    }
}