import React, {Component} from "react";
import {Button} from "react-bootstrap";
import NewNewsModal from "./NewNewsModal";

class NewNewsButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        }
    }

    setModalShow(b) {
        this.setState({
            modalShow: b
        })
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={() => this.setModalShow(true)}>
                    Utwórz nowy
                </Button>

                <NewNewsModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
            </>
        );
    }
}

export default NewNewsButton;