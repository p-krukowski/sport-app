import React, {useState} from 'react';
import ResultsList from "../components/results/ResultsList";
import Results from "../components/results/Results";
import {Fab, Hidden, SwipeableDrawer} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ListIcon from '@material-ui/icons/List';

const ResultsPage = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  return (
      <Grid spacing={2} container wrap='nowrap'>
        <Hidden xsDown>
          <Grid md={3} item>
            <ResultsList/>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Fab size='medium' color='primary' variant='extended' onClick={handleDrawer}>
            <ListIcon fontSize='large' color='action'/>
          </Fab>
          <SwipeableDrawer
              onOpen={handleDrawer}
              onClose={handleDrawer}
              open={openDrawer}
              anchor='bottom'
          >
            <ResultsList/>
          </SwipeableDrawer>
        </Hidden>
        <Grid item md xs>
          <Results/>
        </Grid>
      </Grid>
  );
}

export default ResultsPage;