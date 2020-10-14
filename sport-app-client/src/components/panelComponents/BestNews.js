import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";
import LinkBlank from "../common/LinkBlank";
import {Badge} from "react-bootstrap";
import {dateTimeToWords} from "../../util/timeFormat";
import {getDomainFromLink} from "../../util/linkUtils";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

class BestNews extends Component {
  render() {
    const news = this.props.news;
    const newsTime = dateTimeToWords(news.createdAt);

    return (
        <BestNewsLayout>
          <LinkBlank to={"/newsy/" + news.id}>
            <Image src={news.imageUrl}
                   alt="Brak zdjęcia"/>
            <ContentDiv>
              <Title>
                {news.title}
              </Title>
              <Info>
                <span>
                  <Badge variant="light" style={{fontSize: '0.85em'}}>
                    @{news.authorName}
                  </Badge>
                  <span style={{marginLeft: '5px'}}>{newsTime}</span>
                </span>
                <SourceUrlDiv href={news.link} target="_blank">
                  <OpenInNewIcon/>
                  {getDomainFromLink(news.link)}
                </SourceUrlDiv>
              </Info>
            </ContentDiv>
          </LinkBlank>
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
    transition: transform .1s;
    
    :hover {
      transform: scale(1.03);
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

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.3em;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  
  @media only screen and (min-width: 786px) {
    border-radius: 0;
  }
`

const Title = styled.div`
  display: block;
  font-weight: ${theme.font.bold};
  margin-bottom: 0.3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
    
  @media only screen and (min-width: 768px) {
    font-size: 1.4em;
  }
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const SourceUrlDiv = styled.a`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  
  :hover {
    text-decoration: none;
  }
`
