import styled from "styled-components";
import {theme} from "../../util/theme";

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
`

const ModalContent = styled.div`
  background: ${theme.colors.navbar};
  padding: 10px;
  border-radius: 10px;
  width: 95%;
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }  
`

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.6em;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
`
const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const ModalFoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-top: 1px solid gray;
  margin-top: 10px;
  padding-top: 10px
`

export {Modal, ModalContent, ModalHeader, ModalBody, ModalFoot};