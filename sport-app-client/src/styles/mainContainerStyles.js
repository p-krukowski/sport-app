import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  overflow: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`