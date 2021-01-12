import React, {useState} from "react";
import ExternalNewsForm from "./ExternalNewsForm";
import CustomNewsForm from "./CustomNewsForm";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";

const NewNewsForm = () => {

  const [external, setExternal] = useState(true);

  return (
      <Grid container justify={"center"}>
        <Grid item>
          <ButtonGroup size="large" color="primary">
            <Button variant={external === true ? "contained" : ""}
                    onClick={() => setExternal(true)}>
              Z linku
            </Button>
            <Button variant={external === false ? "contained" : ""}
                    onClick={() => setExternal(false)}>
              Własny
            </Button>
          </ButtonGroup>
        </Grid>
        {
          external &&
          <Grid item xs={12}>
            <ExternalNewsForm/>
          </Grid>
        }
        {
          !external &&
          <Grid item xs={12}>
            <CustomNewsForm/>
          </Grid>
        }
      </Grid>
  );
};

export default NewNewsForm;
