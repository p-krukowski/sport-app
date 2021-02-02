import React from 'react';
import EntryComment from "./EntryComment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const AllComments = props => (
    <Grid container spacing={1} component={Box} pb={1}>
      {
        props.comments.map(comment => (
            <Grid key={comment.id} item xs={12}>
              <EntryComment comment={comment}
                            isAuthenticated={props.isAuthenticated}/>
            </Grid>
        ))
      }
    </Grid>
);

export default AllComments;
