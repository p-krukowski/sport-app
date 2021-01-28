import React from 'react';
import Entry from "./Entry";
import Grid from "@material-ui/core/Grid";

const AllEntries = props => (
    <Grid container spacing={1}>
      {
        props.entries.map((entry) => (
            <Grid item xs={12} key={entry.id}>
              <Entry isAuthenticated={props.isAuthenticated}
                     entry={entry}/>
            </Grid>
        ))
      }
    </Grid>
);

export default AllEntries;
