import React, { Component } from 'react';
import AccountInfo from '../components/AccountInfoPage';
import NavigationBar from '../components/common/NavigationBar';
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from "../util/apiUtils/AuthUtils";


export default class AccountPage extends Component {
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

        if (this.props.isAuthenticated === false) {
            return <Redirect to={"/"} />
        }
        else {
            return (
                <div>
                    <NavigationBar {...this.state} />
                    <AccountInfo {...this.state} />
                </div>
            );
        }
    }
}