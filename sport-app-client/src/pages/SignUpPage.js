import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import NavigationBar from '../components/common/NavigationBar';

import {getCurrentUser} from "../util/apiUtils/AuthUtils";
import SignUp from "../components/auth/SignUp";

export default class SignUpPage extends Component {
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
        if (this.state.isAuthenticated) {
            return <Redirect to={"/"} />
        }
        else {
            return (
                <div>
                    <NavigationBar {...this.state} />
                    <SignUp />
                </div>
            );
        }
    }
}