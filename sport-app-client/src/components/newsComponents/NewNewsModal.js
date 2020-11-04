import React, {Component} from "react";
import NewNewsForm from "./NewNewsForm";
import styled from "styled-components";
import {theme} from "../../util/theme";
import {Card, CardBody, CardHeader} from "../common/CardC";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

class NewNewsModal extends Component {

  render() {
    return (
        <ModalCustom open={this.props.open}
                     onClose={() => this.props.setModalShow(false)}>
          <Fade in={this.props.open}>
            <NewNewsModalLayout tabIndex={-1}>
              <CardHeader>
                <h3>Nowy news</h3>
              </CardHeader>
              <CardBody>
                <NewNewsForm/>
              </CardBody>
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