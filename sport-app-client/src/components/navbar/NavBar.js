import NavBarMdUp from "./NavBarMdUp";
import React from "react";
import Hidden from "@material-ui/core/Hidden";
import NavBarSmDown from "./NavBarSmDown";

const NavBar = () => (
    <>
      <Hidden smDown>
        <NavBarMdUp/>
      </Hidden>
      <Hidden mdUp>
        <NavBarSmDown/>
      </Hidden>
    </>
);

export default NavBar;