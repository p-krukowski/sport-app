import React, {Component} from "react";
import NewNewsForm from "./NewNewsForm";
import styled from "styled-components";
import {theme} from "../../util/theme";
import {Card, CardBody, CardHeader} from "../common/CardCustom";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import {Typography} from "@material-ui/core";

const NewNewsModal = (props) => {

  return (
      <ModalCustom open={props.open}
                   onClose={() => props.setModalShow(false)}>
        <Fade in={props.open}>
          <NewNewsModalLayout tabIndex={-1}>
            <CardHeader>
              <Typography variant={"h5"}>Nowy news</Typography>
            </CardHeader>
            <CardBody>
              <NewNewsForm/>
            </CardBody>
          </NewNewsModalLayout>
        </Fade>
      </ModalCustom>
  );
};

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