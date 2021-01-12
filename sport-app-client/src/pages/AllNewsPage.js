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
          <Grid item xs={0} lg={3}/>
          <Grid
              item xs={12} md={8} lg={6}
              container spacing={1}
          >
            {
              props.isAuthenticated &&
              <Grid item xs={12}>
                <Button onClick={() => props.setShowModal(true)}
                        style={{width: "100%"}}>
                  Utwórz nowy
                  <Box ml={1}>
                    <DescriptionIcon/>
                  </Box>
                </Button>
              </Grid>
            }
            <Grid item xs={12}>
              <AllNews isAuthenticated={props.isAuthenticated}/>
            </Grid>
          </Grid>
          <Grid item xs={0} md={4} lg={3}/>
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
