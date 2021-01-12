import React from "react";
import NewNewsForm from "./NewNewsForm";
import {Dialog, Divider, Paper, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const NewNewsModal = (props) => {

  return (
      <Dialog open={props.open}
              onClose={() => props.setModalShow(false)}>
        <Paper>
          <Box m={"10px"}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant={"h5"}>Nowy news</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
              <Grid item xs={12}>
                <NewNewsForm/>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Dialog>
  );
};

export default NewNewsModal;