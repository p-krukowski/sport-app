import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Toolbar, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinkBlank from "../common/LinkBlank";
import AccountButton from "./AccountButton";
import {connect} from "react-redux";
import {setNavBarHeight} from "../../actions/layoutActions";
import {pageList} from "../../util/pageList";

const NavBarMdUp = (props) => {
  const [tab, setTab] = useState(false);

  useEffect(() => {
    props.setNavBarHeight(document.getElementById('navbar').clientHeight);
  }, [])

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  }

  return (
      <AppBar id="navbar" position="static" color={"transparent"}>
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
                {
                  pageList().map((page, index) => (
                      <Tab
                          key={index}
                          label={page.name}
                          component={LinkBlank}
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
}

const mapStateToProps = state => {
  return {
    navBarHeight: state.layout.navBarHeight
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNavBarHeight: navBarHeight => {
      dispatch(setNavBarHeight(navBarHeight))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMdUp);