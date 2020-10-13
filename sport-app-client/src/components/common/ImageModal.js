import styled from "styled-components";

const ImageModal = styled.div`
  position: fixed;
  display: flex;
  align-content: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0,0,0,0.85);
  cursor: zoom-out;
`

const ImageModalContent = styled.img`
  position: relative;
  margin: auto;
  display: block;
  max-width: 95%;
  
  animation-name: zoom;
  animation-duration: .5s;
  
  @keyframes zoom {
   from {transform: scale(0.1)} 
    to {transform: scale(1)}
  }
`

export {ImageModal, ImageModalContent};