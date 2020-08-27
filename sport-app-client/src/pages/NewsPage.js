import React, {Component} from "react";
import styled from "styled-components";
import {getNewsById} from "../util/apiUtils/NewsUtils";
import News from "../components/newsPageComponents/News";
import NewsCommentSection
  from "../components/newsPageComponents/NewsCommentSection";

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
    return (
        this.state.isComponentReady &&
        <>
          {
            this.state.isNewsFound ?
                <NewsPageLayout>
                  <News news={this.state.news}
                        isAuthenticated={this.props.isAuthenticated}/>
                  <NewsCommentSection newsId={this.state.news.id}
                                      isAuthenticated={this.props.isAuthenticated}/>
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
  width: 60%;
`