import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React from "react";
import Fade from "@material-ui/core/Fade";

const FadeOutOnScroll = ({children}) => {
  const trigger = useScrollTrigger();

  return (
      <Fade appear={false} in={!trigger}>
        {children}
      </Fade>
  );
}

export default FadeOutOnScroll;