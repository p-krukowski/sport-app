import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";
import {fetchCommentsByNewsId} from "../../util/apiUtils/CommentUtils";
import NewNewsComment from "./NewNewsComment";
import NewsComment from "./NewsComment";

class NewsCommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentReady: false,
      comments: null
    }
  }

  fetchCommentsByNewsId = (newsId) => {
    fetchCommentsByNewsId(newsId)
    .then(response => {
      this.setState({
        comments: response,
        isComponentReady: true
      })
    })
  }

  componentDidMount() {
    this.fetchCommentsByNewsId(this.props.newsId);
  }

  render() {
    return (
        this.state.isComponentReady &&
        <NewsCommentSectionLayout>
          <i style={{marginBottom: '10px'}}>Komentarze ({this.state.comments.length})</i>

          {
            this.props.isAuthenticated &&
            <NewNewsComment newsId={this.props.newsId}/>
          }
          {
            this.state.comments.length === 0 ?
                <p style={{alignSelf: 'center', marginTop: '30px'}}>Brak komentarzy</p>
                :
                this.state.comments.map((comment, index) => (
                    <NewsComment key={index}
                                 comment={comment}/>
                ))
          }
        </NewsCommentSectionLayout>
    );
  }
}

export default NewsCommentSection;

const NewsCommentSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.navbar};
  border-radius: 10px;
  padding: 20px;
`