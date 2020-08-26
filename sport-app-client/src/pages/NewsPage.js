import React, {Component} from "react";
import styled from "styled-components";
import {getNewsById} from "../util/apiUtils/NewsUtils";
import {theme} from "../util/theme";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LinkBlank from "../components/common/LinkBlank";
import ABlank from "../components/common/ABlank";

class NewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentReady: false,
      isNewsFound: true
    }
  }

  fetchNewsById = (newsId) => {
    getNewsById(newsId)
    .then(response => {
      this.setState({
        news: response,
        isComponentReady: true
      })
    })
    .catch(error => {
      this.setState({
        isNewsFound: false,
        isComponentReady: true
      })
    })
  }

  componentDidMount() {
    this.fetchNewsById(this.props.match.params.id);
  }

  render() {
    const {news} = this.state;
    return (
        this.state.isComponentReady &&
        <>
          {
            this.state.isNewsFound ?
                <NewsPageLayout>
                  <NewsLayout>
                    {
                      this.props.isAuthenticated &&
                      <ScoreDiv>
                        <ArrowDropUpIconCustom/>
                        <b>{news.score}</b>
                        <ArrowDropDownIconCustom/>
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
                          {news.value}
                        </ABlank>
                      </Description>
                      <Foot>
                        <b>@{news.authorName}</b>
                        {news.createdAt}
                        <SourceUrlDiv href={news.link} target="_blank">
                          <OpenInNewIcon/>
                          TODO: short url
                        </SourceUrlDiv>
                      </Foot>
                    </NewsContent>
                  </NewsLayout>
                </NewsPageLayout>
                :
                <div>Nie ma takiego newsa</div>
          }

        </>
    );
  }
}

export default NewsPage;

const NewsPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`

const NewsLayout = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${theme.colors.navbar};
  padding: 20px;
  height: 290px;
  width: 100%;
`

const ImageDiv = styled.div`
  position: relative;
  width: 30%;
  height: 100%;  
  margin-right: 20px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  height: 100%;
  font-size: 2rem;
`

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`

const Title = styled.div`
  width: 100%;
  padding-bottom: 10px;
  font-size: 1.7rem;
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

const ArrowDropDownIconCustom = styled(ArrowDropDownIcon)`
  font-size: 5rem;
  border: white 1px solid;
  border-radius: 5px;
  
  :hover {
    color: ${theme.colors.navbar};
    border: white 1px solid;
    background: white;
    cursor: pointer;
  }
`

const ArrowDropUpIconCustom = styled(ArrowDropUpIcon)`
  font-size: 5rem;
  border: white 1px solid;
  border-radius: 5px;
  
  :hover {
    color: ${theme.colors.navbar};
    border: white 1px solid;
    background: white;
    cursor: pointer;
  }
`