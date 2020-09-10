import React, {Component} from 'react';

import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";

class AllComments extends Component {

  render() {
    return (
        this.props.comments && this.props.comments.map(comment => (
            <Card key={comment.id}
                  style={{
                    background: theme.colors.background,
                    borderColor: theme.colors.navbar
                  }}>
              <CardHeader style={{fontSize: "1rem"}}>
                <div
                    style={{marginRight: '5px'}}>{comment.author.username}</div>
                <div>{comment.createdAt}</div>
                <div style={{marginLeft: 'auto'}}>{comment.score}</div>
              </CardHeader>
              <CardBody>
                {comment.value}
              </CardBody>
            </Card>
        ))
    );
  }
}

export default AllComments;