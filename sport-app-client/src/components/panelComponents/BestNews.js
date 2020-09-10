import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";

class BestNews extends Component {
  render() {
    return (
        <BestNewsLayout>
          <Image src={this.props.news.imageUrl}
                 alt="Brak zdjęcia"/>
          <ContentDiv>
            <Title>
              {this.props.news.title}
            </Title>
            {this.props.news.createdAt}
          </ContentDiv>
        </BestNewsLayout>
    );
  }
}

export default BestNews;

const BestNewsLayout = styled.div`
  height: 50vw;
  width: 100%;
  position: relative;
  border-radius: 3px;
  
  @media only screen and (min-width: 768px) {
    border-radius: 0;
    height: 100%;
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

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.3em;
`

const Title = styled.div`
  display: flex;
  font-weight: ${theme.font.bold};
  margin-bottom: 0.3em;  
    
  @media only screen and (min-width: 768px) {
    font-size: 1.5em;
  }
`
