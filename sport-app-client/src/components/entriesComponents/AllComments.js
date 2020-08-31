import React, {Component} from 'react';

import {getComments} from "../../util/apiUtils/CommentUtils";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";

class AllComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    getComments(this.props.entryId)
    .then(response => {
      this.setState({
        comments: response
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.entryToUpdate !== prevProps.entryToUpdate) {
      getComments(this.props.entryId)
      .then(response => {
        this.setState({
          comments: response
        });
      });
    }
  }

  render() {
    return (
        <>
          {
            this.state.comments && this.state.comments.map(comment => (
                <Card key={comment.id}
                      style={{
                        background: theme.colors.background,
                        borderColor: theme.colors.navbar}}>
                  <CardHeader style={{fontSize: "1rem"}}>
                    <div style={{marginRight: '5px'}}>{comment.author.username}</div>
                    <div>{comment.createdAt}</div>
                    <div style={{marginLeft: 'auto'}}>{comment.score}</div>
                  </CardHeader>
                  <CardBody>
                    {comment.value}
                  </CardBody>
                </Card>
            ))
          }
        </>
    );
  }
}

export default AllComments;