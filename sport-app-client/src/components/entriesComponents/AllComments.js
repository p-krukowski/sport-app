import React, {Component} from 'react';
import styled from "styled-components";
import EntryComment from "./EntryComment";

//TODO: fetching comments inside this component
class AllComments extends Component {
  render() {
    return (
        <AllCommentsLayout>
          {
            this.props.comments.map(comment => (
                <EntryComment key={comment.id}
                              comment={comment}/>
            ))
          }
        </AllCommentsLayout>
    );
  }
}

export default AllComments;

const AllCommentsLayout = styled.div`
  margin-top: 5px;
`