import React, {useEffect, useState} from 'react';

import AllEntries from "../components/entriesComponents/AllEntries";
import NewEntry from "../components/entriesComponents/NewEntry";
import {getAllEntries} from "../util/apiUtils/EntriesUtils";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const EntriesPage = (props) => {

  const [entries, setEntries] = useState();
  const [isComponentReady, setIsComponentReady] = useState(false);

  const getEntries = () => {
    getAllEntries()
    .then(response => {
      setEntries(response);
      setIsComponentReady(true);
    })
    .catch(error => {
      console.log("Nie udało się pobrać wpisów");
    })
  }

  useEffect(getEntries, []);

  return (
      isComponentReady &&
      <Grid container justify={"center"}>
        <Grid item xs={false} xl/>
        <Grid item xs={12} md={9} lg={9} xl={6}
              component={Box} height={{xs: "auto", md: "1"}}>
          <Box display={"flex"} flexDirection={"column"}
               height={{xs: "auto", sm: "1"}}
               overflow={{md: "auto", lg: "auto"}} pr={"5px"}>
            {
              props.isAuthenticated &&
              <Box width={1} mb={1}>
                <NewEntry getEntries={getEntries}/>
              </Box>
            }
            <Box width={1}>
              <AllEntries isAuthenticated={props.isAuthenticated}
                          entries={entries}/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs/>
      </Grid>
  );
};

export default EntriesPage;
