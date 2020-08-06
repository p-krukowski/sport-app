import React, {Component} from 'react';

import {Button, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {ACCESS_TOKEN} from '../../constants';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated
        }
    }

    handleLogout = () => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            localStorage.removeItem(ACCESS_TOKEN);
            this.setState({
                isAuthenticated: false
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
            this.setState(this.props);
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" style={{marginBottom: "20px", padding: '6px'}}>
                <Link to={""} className="navbar-brand" style={{padding: '4px', fontSize: '1.1em'}}>SportApp</Link>
                <Nav>
                    <Link to={"panel"} className="nav-link" style={{padding: '4px'}}>Panel</Link>
                </Nav>
                <Nav>
                    <Link to={"newsy"} className="nav-link" style={{padding: '4px'}}>Newsy</Link>
                </Nav>
                <Nav>
                    <Link to={"wpisy"} className="nav-link" style={{padding: '4px'}}>Wpisy</Link>
                </Nav>
                <Nav>
                    <Link to={"wyniki"} className="nav-link" style={{padding: '4px'}}>Wyniki</Link>
                </Nav>
                {this.state.isAuthenticated ?
                    <Nav className="ml-auto">
                        <Button variant="primary" style={{padding: 0}}>
                            <Link to={"moje-konto"} className="nav-link" style={{padding: '4px'}}>Moje konto</Link>
                        </Button>
                        <Button onClick={this.handleLogout} variant="secondary" style={{padding: 0, marginLeft: '5px'}}>
                            <Link to={"login"} className="nav-link" style={{padding: '4px'}}>Wyloguj</Link>
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant="primary" style={{padding: 0}}>
                            <Link to={"login"} className="nav-link">Zaloguj</Link>
                        </Button>
                        <Button variant="secondary" style={{padding: 0, marginLeft: '5px'}}>
                            <Link to={"signup"} className="nav-link">Rejestracja</Link>
                        </Button>
                    </Nav>
                }
            </Navbar>
        )
    }
}