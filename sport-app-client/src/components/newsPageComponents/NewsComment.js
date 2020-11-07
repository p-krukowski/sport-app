import React, {Component} from "react";
import styled from "styled-components";
import {Card, CardBody, CardFoot, CardHeader} from "../common/CardCustom";
import {theme} from "../../util/theme";

class NewsComment extends Component {
  render() {
    const comment = this.props.comment;
    return (
        <NewsCommentLayout>
          <Card style={{
            background: theme.colors.background,
            borderColor: theme.colors.navbar}}>
            <CardHeader>
              {comment.author.username}
            </CardHeader>
            <CardBody style={{fontSize: '1rem'}}>
              {comment.value}
            </CardBody>
            <CardFoot>
              {comment.createdAt}
            </CardFoot>
          </Card>
        </NewsCommentLayout>
    );
  }
}
export default NewsComment;

const NewsCommentLayout = styled.div`
  margin-bottom: 10px;
`