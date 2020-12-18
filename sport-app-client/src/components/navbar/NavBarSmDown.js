import React, {useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {List, SwipeableDrawer, Tab, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Grid from "@material-ui/core/Grid";
import AccountButton from "./AccountButton";
import Fab from "@material-ui/core/Fab";
import HideOnScroll from "../common/HideOnScroll";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LinkBlank from "../common/LinkBlank";
import {pageList} from "../../util/pageList";
import Box from "@material-ui/core/Box";
import FadeOutOnScroll from "../common/FadeOutOnScroll";

const NavBarSmDown = () => {

  const [drawer, setDrawer] = useState(false);
  const [pageIndex, setPageIndex] = useState(false);

  function handleDrawer() {
    setDrawer(!drawer);
  }

  return (
      <>
        <HideOnScroll>
          <AppBar color={"primary"}>
            <Toolbar variant={"dense"}>
              <Grid container justify={"space-between"}>
                <Grid item>
                  <Tab
                      component={LinkBlank}
                      to={"/panel"}
                      label={"SportApp"}
                      onClick={() => setPageIndex(0)}/>
                </Grid>
                <Grid item xs container alignItems={"center"}
                      justify={"flex-end"}>
                  <AccountButton setTab={setPageIndex}/>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <FadeOutOnScroll>
          <Fab size={"medium"} onClick={handleDrawer}>
            <MenuIcon/>
          </Fab>
        </FadeOutOnScroll>
        <SwipeableDrawer
            onClose={handleDrawer}
            onOpen={handleDrawer}
            open={drawer}
            anchor={"bottom"}
        >
          <List>
            {
              pageList().map((page, index) => (
                  <ListItem
                      key={index}
                      button
                      component={LinkBlank}
                      to={page.address}
                      selected={index === pageIndex}
                      onClick={() => setPageIndex(index)}
                  >
                    <Box mx={"auto"}>
                      <Typography align={"center"}>{page.name}</Typography>
                    </Box>
                  </ListItem>
              ))
            }
          </List>
        </SwipeableDrawer>
      </>
  );
};

export default NavBarSmDown;
