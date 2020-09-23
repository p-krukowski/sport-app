import React, {Component} from "react";
import styled from "styled-components";
import {Badge} from "react-bootstrap";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {Card, CardBody, CardFoot, CardHeader} from "../common/CardC";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ReportIcon from '@material-ui/icons/Report';
import ForumIcon from '@material-ui/icons/Forum';
import {theme} from "../../util/theme";
import LinkBlank from "../common/LinkBlank";
import {addPointToNews} from "../../util/apiUtils/NewsUtils";

class NewsCover extends Component {
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
    const news = this.state.news;
    return (
        <NewsCoverLayout>
          <ImageDiv>
            <LinkBlank to={"/newsy/" + news.id}>
              <ImageCustom src={news.imageUrl}
                           alt="Nie udało się załadować zdjęcia"/>
            </LinkBlank>
            {
              this.props.isAuthenticated &&
              <ImageInfoBgTop>
                <ArrowDropUpIconCustom onClick={() => this.addPoint(news.id)}/>
                <b style={{margin: "0 10%"}}>{news.score}</b>
                <ReportIconCustom/>
              </ImageInfoBgTop>
            }
            <ImageInfoBgBottom>
              {news.createdAt}
              <BadgeCustom variant='light'>
                @{news.authorName}
              </BadgeCustom>
            </ImageInfoBgBottom>
          </ImageDiv>
          <InfoDiv>
            <CardCustom>
              <CardHeader>
                <LinkBlank to={"/newsy/" + news.id}>
                  <b>{news.title}</b>
                </LinkBlank>
              </CardHeader>
              <CardBody style={{fontSize: '0.9em'}}>
                <LinkBlank to={"/newsy/" + news.id}>
                  {news.value}
                </LinkBlank>
              </CardBody>
              <CardFootCustom>
                <SourceUrlDiv href={news.link} target="_blank">
                  <OpenInNewIcon/>
                  TODO: short url
                </SourceUrlDiv>
                <LinkBlank style={{marginLeft: 'auto', width: 'auto'}}
                           to={"/newsy/" + news.id}>
                  <ForumIcon/> Komentarze
                </LinkBlank>
              </CardFootCustom>
            </CardCustom>
          </InfoDiv>
        </NewsCoverLayout>
    );
  }
}

export default NewsCover;

const NewsCoverLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    height: 18vh;
    min-height: 180px;
  }
`

const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: 150px;
  width: 100%;
  
  @media only screen and (min-width: 768px) {  
  height: 100%;
  width: 220px;
  }  
`

const ImageCustom = styled.img`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  
  @media only screen and (min-width: 768px) {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
`

const ImageInfoBgBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  margin: 0;
  padding: 5%;
  height: 2rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 0.8em;
  
  @media only screen and (min-width: 768px) {
    border-bottom-left-radius: 5px;
  }
`

const ImageInfoBgTop = styled(ImageInfoBgBottom)`
  top: 0;
  justify-content: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 1.2rem;
  
  @media only screen and (min-width: 768px) {
    border-top-right-radius: 5px;
  }
`

const BadgeCustom = styled(Badge)`
 margin-left: auto;
`

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media only screen and (min-width: 768px) {
    width: 70%;
    height: 100%;
  }
`

const CardCustom = styled(Card)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-bottom: 0;

  @media only screen and (min-width: 768px) {
    height: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  } 
`

const CardFootCustom = styled(CardFoot)`
  display: none;
  
  @media only screen and (min-width: 768px) {
    display: flex;
  }
`

const SourceUrlDiv = styled.a`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  
  :hover {
    text-decoration: none;
  }
`

const ReportIconCustom = styled(ReportIcon)`
  font-size: 1.4rem;
  border: white 1px solid;
  border-radius: 5px;
  
  :hover {
    color: ${theme.colors.navbar};
    border: white 1px solid;
    background: white;
    cursor: pointer;
`

const ArrowDropUpIconCustom = styled(ArrowDropUpIcon)`
  font-size: 1.4rem;
  border: white 1px solid;
  border-radius: 5px;
  
  :hover {
    color: ${theme.colors.navbar};
    border: white 1px solid;
    background: white;
    cursor: pointer;
`