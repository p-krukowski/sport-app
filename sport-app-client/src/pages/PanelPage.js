import React from 'react';
import SocialPanel from "../components/panelComponents/SocialPanel";
import SportPanel from "../components/panelComponents/SportPanel";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const PanelPage = (props) => (
    <Grid container component={Box} height={1} width={1} spacing={1}>
      <Grid item xs={12} md={6} lg={7}
            component={Box} height={1} order={{xs: 2, md: 1}}>
        <SocialPanel/>
      </Grid>
      <Grid item xs={12} md={6} lg={5}
            component={Box} height={{md: 1}} order={{xs: 1, md: 2}}>
        <SportPanel {...props}/>
      </Grid>
    </Grid>
);

export default PanelPage;