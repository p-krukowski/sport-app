import React, {Component} from "react";
import styled from "styled-components";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";
import {dateTimeToWords} from "../../util/timeFormat";

class EntryComment extends Component {
  render() {
    const {comment} = this.props;
    const commentTime = dateTimeToWords(comment.createdAt);

    return (
        <EntryCommentLayout>
          <CardHeader style={{fontSize: "1rem"}}>
            <span
                style={{marginRight: '5px'}}>{comment.author.username}</span>
            <span>{commentTime}</span>
            <span style={{marginLeft: 'auto'}}>{comment.score}</span>
          </CardHeader>
          <CardBody>
            {comment.value}
          </CardBody>
        </EntryCommentLayout>
    );
  }
}

export default EntryComment;

const EntryCommentLayout = styled(Card)`
  background: ${theme.colors.background};
  border-color: ${theme.colors.navbar};
  margin-bottom: 3px;
`