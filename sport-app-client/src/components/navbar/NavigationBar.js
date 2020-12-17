import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Button, Toolbar, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinkBlank from "../common/LinkBlank";
import AccountButton from "./AccountButton";

const NavigationBar = (props) => {
  const [tab, setTab] = useState(false);

  useEffect(() => {
    props.updateNavbarHeight(document.getElementById('navbar').clientHeight);
  }, [])

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  }

  return (
      <AppBar id='navbar' position="static" color={"transparent"}>
        <Toolbar variant={"dense"}>
          <Grid container justify={"space-between"}>
            <Grid item xs container alignItems={"center"}>
              <Typography
                  component={LinkBlank}
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
                <Tab component={LinkBlank} to={"/panel"} label="Panel"/>
                <Tab component={LinkBlank} to={"/newsy"} label="Newsy"/>
                <Tab component={LinkBlank} to={"/wpisy"} label="Wpisy"/>
                <Tab component={LinkBlank} to={"/wyniki"} label="Wyniki"/>
              </Tabs>
            </Grid>
            <Grid item xs container alignItems={"center"} justify={"flex-end"}>
              {
                !props.isAuthenticated ?
                    <Button
                        component={LinkBlank}
                        to={"/logowanie"}
                        onClick={() => setTab(false)}
                        variant={"outlined"}
                        size={"small"}
                        color={"primary"}
                    >Logowanie</Button>
                    :
                    <AccountButton setTab={setTab}/>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}

export default NavigationBar;