import React, {Component} from "react";

import styled from "styled-components";
import LinkBlank from "../common/LinkBlank";

class NextBestNews extends Component {
  render() {
    return (
        <NextBestNewsLayout>
          {
            this.props.news.map((news, index) => (
                index > 0 &&
                <News key={index}>
                  <LinkBlank to={"/newsy/" + news.id}>
                    <Image src={news.imageUrl}
                           alt="Brak zdjęcia"/>
                    <Info>{news.title}</Info>
                  </LinkBlank>
                </News>

            ))
          }
        </NextBestNewsLayout>
    );
  }
}

export default NextBestNews;

const NextBestNewsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: relative;
`

const News = styled.div`
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
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  
  @media only screen and (min-width: 768px) {
    border-radius: 0;
  }
`
const Info = styled.div`
  display: block;
  position: absolute;
  background: rgba(0,0,0,0.8);
  bottom: 0;
  padding: 0 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  
  @media only screen and (min-width: 786px) {
    border-radius: 0;
  }
`