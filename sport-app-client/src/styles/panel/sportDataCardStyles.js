import styled from "styled-components";

export const SportDataCardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5px;  
  
  @media only screen and (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
`