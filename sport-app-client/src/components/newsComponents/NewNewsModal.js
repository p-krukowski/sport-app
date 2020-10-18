import React, {Component} from "react";
import {Button} from "react-bootstrap";
import NewNewsForm from "./NewNewsForm";
import {addNews} from "../../util/apiUtils/NewsUtils";
import styled from "styled-components";
import {theme} from "../../util/theme";
import {Card, CardBody, CardFoot, CardHeader} from "../common/CardC";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

class NewNewsModal extends Component {

  updateFields = (content) => {
    this.setState({
      content: content
    })
  }

  handleCreate = () => {
    addNews(this.state.content)
    .then(response => {
      this.props.setModalShow(false);
    })
  }

  render() {
    return (
        <ModalCustom open={this.props.open}
                     onClose={() => this.props.setModalShow(false)}>
          <Fade in={this.props.open}>
            <NewNewsModalLayout tabIndex={-1}>
              <CardHeader>
                <span>Nowy news</span>
              </CardHeader>
              <CardBody>
                <NewNewsForm updateFields={this.updateFields}/>
              </CardBody>
              <CardFoot>
                <Button onClick={this.handleCreate}>Utwórz</Button>
              </CardFoot>
            </NewNewsModalLayout>
          </Fade>
        </ModalCustom>
    )
  }
}

export default NewNewsModal;

const NewNewsModalLayout = styled(Card)`
  background-color: ${theme.colors.navbar};
  
  @media only screen and (min-width: 768px) {
    width: 600px;
  }
`

const ModalCustom = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`