import React, {Component} from "react";
import {Button, Col} from "react-bootstrap";
import AllNews from "../components/newsComponents/AllNews";
import NewNewsModal from "../components/newsComponents/NewNewsModal";

class AllNewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };
    }

    setModalShow = (b) => {
        this.setState({
            modalShow: b
        })
    }

    render() {
        return (
            <>
                <Col sm='8' style={{padding: 0}}>
                    {
                        this.props.isAuthenticated &&
                        <Button variant="primary"
                                style={{marginBottom: '10px'}}
                                onClick={() => this.setModalShow(true)}>
                            Utwórz nowy
                        </Button>
                    }
                    <AllNews modalShow={this.state.modalShow}
                             isAuthenticated={this.props.isAuthenticated}/>
                </Col>

                <NewNewsModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
            </>
        )

    }

}

export default AllNewsPage;