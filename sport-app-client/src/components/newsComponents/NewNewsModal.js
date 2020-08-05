import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import NewNewsForm from "./NewNewsForm";
import {addNews} from "../../util/apiUtils/NewsUtils";

class NewNewsModal extends Component {

    updateFields = (content) => {
        this.setState({
            content: content
        })
    }

    handleCreate = () => {
        addNews(this.state.content)
            .then(response => {
                this.props.onHide();
            })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Nowy news
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewNewsForm updateFields={this.updateFields}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleCreate}>Utwórz</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default NewNewsModal;