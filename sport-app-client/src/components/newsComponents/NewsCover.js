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
            <Card style={{
              height: '100%',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }}>
              <CardHeader>
                <LinkBlank to={"/newsy/" + news.id}>
                  {news.title}
                </LinkBlank>
              </CardHeader>
              <CardBody>
                <LinkBlank to={"/newsy/" + news.id}>
                  {news.value}
                </LinkBlank>
              </CardBody>
              <CardFoot>
                <SourceUrlDiv href={news.link} target="_blank">
                  <OpenInNewIcon/>
                  TODO: short url
                </SourceUrlDiv>
                <LinkBlank style={{marginLeft: 'auto', width: 'auto'}}
                           to={"/newsy/" + news.id}>
                  <ForumIcon/> Komentarze
                </LinkBlank>
              </CardFoot>
            </Card>
          </InfoDiv>
        </NewsCoverLayout>
    );
  }
}

export default NewsCover;

const NewsCoverLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 170px;
  margin: 0 0 10px 0;
`

const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 220px;
  padding: 0px;
`

const ImageCustom = styled.img`
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  border-bottom-left-radius: 5px;
`

const ImageInfoBgTop = styled(ImageInfoBgBottom)`
  top: 0;
  justify-content: center;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 1.2rem;
`

const BadgeCustom = styled(Badge)`
 margin-left: auto;
`

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
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