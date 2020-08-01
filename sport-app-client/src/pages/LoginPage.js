import React, { Component } from 'react';

import NavigationBar from '../components/common/NavigationBar';
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from "../util/apiUtils/AuthUtils";
import LoginForm from "../components/auth/LoginForm";


export default class LoginPage extends Component {
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
                    <LoginForm {...this.state} />
                </div>
            );
        }
    }
}