import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import SignUp from "../components/auth/SignUp";

export default class SignUpPage extends Component {

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={"/"}/>
        } else {
            return (
                <SignUp/>
            );
        }
    }
}