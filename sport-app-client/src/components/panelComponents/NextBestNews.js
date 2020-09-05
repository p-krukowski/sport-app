import React, {Component} from "react";

import styled from "styled-components";

class NextBestNews extends Component {
  render() {
    return (
        <NextBestNewsLayout>
          {
            this.props.news.map((news, index) => (
                index > 0 &&
                <News key={index}>
                  <Image src={news.imageUrl}
                       alt="Brak zdjęcia"/>
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
  width: 100%;
  height: 50vw;
  margin-top: 10px;
  
  @media only screen and (min-width: 768px) {
    margin-top: auto;
    height: 33%;
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
