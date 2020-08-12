import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";

class BestNews extends Component {
    render() {
        return (
            <BestNewsLayout>
                <img src={this.props.news.imageUrl}
                     alt="Brak zdjęcia"
                     style={{
                         height: '100%',
                         width: '100%',
                         objectFit: 'cover'}}/>
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
  height: 100%;
  width: 100%;
  position: relative;
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 0;
  margin: 0;
  height: 20%;
  width: 100%;
  background: black;
  opacity: .8;
  padding: 3%;
`

const Title = styled.div`
  display: flex;  
  font-size: 1.5em;
  font-weight: ${theme.font.bold};
`
