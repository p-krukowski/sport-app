import React from "react";
import EntryPanel from "./EntryPanel";
import Grid from "@material-ui/core/Grid";

const BestEntries = props =>
    <Grid container spacing={1}>
        {
            props.entries.length !== 0 && props.entries.map((entry) => (
                <Grid key={entry.id} item xs={12}>
                    <EntryPanel key={entry.id} isAuthenticated={false} entry={entry}/>
                </Grid>
            ))
        }
    </Grid>


export default BestEntries;
