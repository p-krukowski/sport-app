import styled from "styled-components";
import {Card, CardBody, CardHeader} from "../../components/common/CardCustom";
import {theme} from "../../util/theme";

export const CardStyled = styled(Card)`
  background: ${theme.colors.background};
  justify-content: flex-start;
  
  @media only screen and (min-width: 768px) {
    margin-right: 5px;
    width: 50%;
  }
`

export const CardHeaderStyled = styled(CardHeader)`
  justify-content: center;
`

export const CardBodyStyled = styled(CardBody)`
  padding: 5px;
`