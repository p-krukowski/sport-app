import React, {Component} from "react";
import styled from "styled-components";
import ABlank from "../common/ABlank";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {theme} from "../../util/theme";
import ReportIcon from '@material-ui/icons/Report';
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {addPointToNews} from "../../util/apiUtils/NewsUtils";
import {getDomainFromLink} from "../../util/linkUtils";
import {dateTimeToWords} from "../../util/timeFormat";

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: this.props.news
    }
  }

  addPoint = (newsId) => {
    addPointToNews(newsId)
    .then(response => {
      this.setState({
        news: {
          ...this.state.news,
          score: response
        }
      })
    })
  }

  render() {
    const {news} = this.state;
    return (
        <NewsLayout>
          {
            this.props.isAuthenticated &&
            <ScoreDiv>
              <ArrowDropUpIconCustom onClick={() => this.addPoint(news.id)}/>
              <b>{news.score}</b>
              <ReportIconCustom/>
            </ScoreDiv>
          }
          <ImageDiv>
            <ABlank href={news.link} target="_blank">
              <Image src={news.imageUrl}/>
            </ABlank>
          </ImageDiv>
          <NewsContent>
            <Title>
              <ABlank href={news.link} target="_blank">
                {news.title}
              </ABlank>
            </Title>
            <Description>
              <ABlank href={news.link} target="_blank">
                {news.description}
              </ABlank>
              <ABlank href={news.link} target="_blank">
                {news.content}
              </ABlank>
            </Description>
            <Foot>
              <b>@{news.authorName}</b>
              <span>{dateTimeToWords(news.createdAt)}</span>
              <SourceUrlDiv href={news.link} target="_blank">
                <OpenInNewIcon/>
                {getDomainFromLink(news.link)}
              </SourceUrlDiv>
            </Foot>
          </NewsContent>
        </NewsLayout>
    );
  }
}

export default News;

const NewsLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: ${theme.colors.navbar};
  margin-bottom: 10px;
  padding: 10px;
    
  @media only screen and (min-width: 768px) {
    padding: 20px;
    flex-direction: row;
    height: 290px;
    width: 100%;
  }
`

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 100%;
  font-size: 2rem;
  
  @media only screen and (min-width: 768px) {
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 0;
  }
`

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  
  @media only screen and (min-width: 768px) {
    width: 30%;
    height: 100%;  
    margin-right: 20px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media only screen and (min-width: 768px) {
    width: 70%;
  }
`

const Title = styled.div`
  width: 100%;
  padding-bottom: 10px;
  font-size: 1.3rem;
  font-weight: ${theme.font.bold};
  border-bottom: 1px solid ${theme.colors.background};
`

const Description = styled.div`
  padding: 10px 0;
  overflow: scroll;
`

const Foot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${theme.colors.background};
  padding-top: 10px;
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

const ReportIconCustom = styled(ReportIcon)`
  font-size: 2rem !important;
  border-radius: 5px;
  margin-left: 20px;
  
  :hover {
    color: ${theme.colors.navbar};
    background: white;
    cursor: pointer;
  }
  
  @media only screen and (min-width: 768px) {
    margin-top: 8px;
    margin-left: 0;
  }
`

const ArrowDropUpIconCustom = styled(ArrowDropUpIcon)`
  font-size: 2rem !important;
  border-radius: 5px;
  margin-right: 20px;
  
  :hover {
    color: ${theme.colors.navbar};
    background: white;
    cursor: pointer;
  }
  
  @media only screen and (min-width: 768px) {
    margin-top: 8px;
    margin-right: 0;
  }
`
