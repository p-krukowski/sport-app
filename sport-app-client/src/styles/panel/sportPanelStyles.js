import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {CardBody} from "../../components/common/CardCustom";

export const SportPanelLayout = styled.div`
  display: flex;
  position: relative;
  
  @media only screen and (min-width: 768px) {
    width: 40%;
  }
`

export const ButtonAdjusted = styled(Button)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  
  .MuiButton-label {
    display: flex;
    flex-direction: column;
  }
`

export const CardBodySportPanel = styled(CardBody)`
  align-items: center;
  padding: 5px;
  overflow: auto;
  height: 100%;
`