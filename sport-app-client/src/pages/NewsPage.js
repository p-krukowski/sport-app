import React, {Component} from "react";
import {getCurrentUser} from "../util/apiUtils/AuthUtils";
import NavigationBar from "../components/common/NavigationBar";
import {Button, Col, Container} from "react-bootstrap";
import AllNews from "../components/newsComponents/AllNews";
import NewNewsModal from "../components/newsComponents/NewNewsModal";

class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            modalShow: false
        };
    }

    setModalShow = (b) => {
        this.setState({
            modalShow: b
        })
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
                            <Button variant="primary" onClick={() => this.setModalShow(true)}>
                                Utwórz nowy
                            </Button>
                        }
                        <AllNews/>
                    </Col>
                </Container>

                <NewNewsModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
            </>
        )

    }

}

export default NewsPage;