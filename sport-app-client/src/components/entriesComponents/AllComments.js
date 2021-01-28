import React from 'react';
import EntryComment from "./EntryComment";
import Grid from "@material-ui/core/Grid";

const AllComments = props => (
    <Grid container spacing={1}>
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
