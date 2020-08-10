import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';
import LoginForm from "../components/auth/LoginForm";

export default class LoginPage extends Component {

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={"/"}/>
        } else {
            return (
                <LoginForm />
            );
        }
    }
}