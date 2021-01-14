import React, {useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Toolbar, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinkInternal from "../common/LinkInternal";
import AccountButton from "./AccountButton";
import {pageList} from "../../util/pageList";

const NavBarMdUp = () => {
  const [tab, setTab] = useState(false);

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  }

  return (
      <AppBar position="static" color={"transparent"}>
        <Toolbar variant={"dense"}>
          <Grid container justify={"space-between"}>
            <Grid item xs container alignItems={"center"}>
              <Typography
                  component={LinkInternal}
                  variant={"h6"}
                  to={"/"}
                  onClick={() => setTab(0)}
              >
                SportApp
              </Typography>
            </Grid>
            <Grid item xs>
              <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  indicatorColor={"primary"}
              >
                {
                  pageList().map((page, index) => (
                      <Tab
                          key={index}
                          label={page.name}
                          component={LinkInternal}
                          to={page.address}/>
                  ))
                }
              </Tabs>
            </Grid>
            <Grid item xs container alignItems={"center"} justify={"flex-end"}>
              <AccountButton setTab={setTab}/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
};

export default NavBarMdUp;