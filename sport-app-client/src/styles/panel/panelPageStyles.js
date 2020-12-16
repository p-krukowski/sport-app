import styled from "styled-components";

export const PanelPageLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`