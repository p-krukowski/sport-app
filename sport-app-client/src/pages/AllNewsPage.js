import React from "react";

import AllNews from "../components/newsComponents/AllNews";
import DescriptionIcon from '@material-ui/icons/Description';
import NewNewsModal from "../components/newsComponents/NewNewsModal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import {setShowNewNewsModal} from "../actions/modalsActions";

const AllNewsPage = (props) => {

  return (
      <>
        <Grid container justify={"center"}>
          <Grid item xs={false} xl/>
          <Grid item xs={12} md={9} lg={9} xl={6}
                component={Box} height={{xs: "auto", md: "1"}}>
            <Box display={"flex"} flexDirection={"column"}
                 height={{xs: "auto", sm: "1"}} overflow={{md: "auto", lg: "auto"}} pr={"5px"}>
              {
                props.isAuthenticated &&
                <Box width={1} mb={1}>
                  <Button onClick={() => props.setShowModal(true)}
                          fullWidth>
                    Utwórz nowy
                    <Box ml={1}>
                      <DescriptionIcon/>
                    </Box>
                  </Button>
                </Box>
              }
              <Box width={1}>
                <AllNews isAuthenticated={props.isAuthenticated}/>
              </Box>
            </Box>
          </Grid>
          <Grid item xs/>
        </Grid>

        <NewNewsModal
            open={props.showModal}
            setModalShow={props.setShowModal}/>
      </>
  )
}

const mapStateToProps = (state) => {
  return {
    showModal: state.modals.showNewNewsModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowModal: showModal => {
      dispatch(setShowNewNewsModal(showModal));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNewsPage);
