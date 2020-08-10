import React, {Component} from 'react';
import AccountInfo from '../components/AccountInfoPage';
import {Redirect} from 'react-router-dom';


export default class AccountPage extends Component {

    render() {
        return (
            this.props.isAuthenticated ?
                <AccountInfo {...this.props} />
                :
                <Redirect to={"/"}/>
        )
    }
}