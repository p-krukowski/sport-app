import React, {Component} from "react";
import {getCurrentUser} from "../util/apiUtils/AuthUtils";
import NavigationBar from "../components/common/NavigationBar";
import NewNewsButton from "../components/newsComponents/NewNewsButton";
import {Col, Container} from "react-bootstrap";
import AllNews from "../components/newsComponents/AllNews";

class NewsPage extends Component {
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
            this.setState({});
        });
    }

    render() {
        return (
            <>
                <NavigationBar {...this.state} />
                <Container fluid>
                    <Col sm='8' style={{padding: 0}}>
                        {
                            this.state.isAuthenticated &&
                            <NewNewsButton/>
                        }
                        <AllNews/>
                    </Col>
                </Container>

            </>
        )

    }

}

export default NewsPage;