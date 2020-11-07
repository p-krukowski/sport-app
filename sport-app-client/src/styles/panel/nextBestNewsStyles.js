import styled from "styled-components";

export const NextBestNewsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: relative;
`

export const News = styled.div`
  position: relative;
  width: 100%;
  height: 50vw;
  margin-top: 10px;
  
  @media only screen and (min-width: 768px) {
    margin-top: 0;
    height: 32.8%;
    transition: transform .1s;
    
    :hover {
      transform: scale(1.1);
      z-index: 2;
    }
  }
`
export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  
  @media only screen and (min-width: 768px) {
    border-radius: 0;
  }
`
export const Info = styled.div`
  position: absolute;
  background: rgba(0,0,0,0.8);
  width: 100%;
  bottom: 0;
  padding: 3px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  
  @media only screen and (min-width: 786px) {
    border-radius: 0;
  }
`

export const Title = styled.div`
  display: block;
  width: 100%;
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const SourceUrlDiv = styled.a`
  height: 100%;
  font-size: 0.8em;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  
  :hover {
    text-decoration: none;
  }
`