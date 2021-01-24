import React, {useRef, useState} from "react";
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import {addEntry} from "../../util/apiUtils/EntriesUtils";
import {Chip, IconButton, Paper, Snackbar} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {TextInput} from "../common/customInputs";
import {Alert} from "@material-ui/lab";
import {
  uploadEntryImage
} from "../../util/apiUtils/MediaUploadUtils";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ComputerIcon from '@material-ui/icons/Computer';
import LinkIcon from '@material-ui/icons/Link';

const NewEntry = (props) => {

  const [alert, setAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({
    content: "Wystąpił nieoczekiwany błąd",
    severity: "warning"
  });
  const [image, setImage] = useState(null);
  const [imageMenu, setImageMenu] = useState(false);
  const inputRef = useRef();

  const handleAddEntry = (value, resetForm) => {
    if (image) {
      addEntryWithImage(value, resetForm);
    } else {
      uploadEntry(value, null, resetForm)
    }
  };

  const addEntryWithImage = (value, resetForm) => {
    const formData = new FormData();

    formData.append("file", image);
    uploadEntryImage(formData)
    .then(fetchedImageUrl => {
      uploadEntry(value, fetchedImageUrl, resetForm);
    })
    .catch(error => {
      setAlertStyle({
        content: "Nie udało się wysłać zdjęcia",
        severity: "error"
      });
      setAlert(true);
    });
  }

  const uploadEntry = (value, imageUrl, resetForm) => {
    const entry = {
      content: value,
      imageUrl: imageUrl
    }
    addEntry(entry)
    .then(response => {
      props.getEntries();
      setAlertStyle({
        content: "Dodano wpis",
        severity: "success"
      });
      setAlert(true);
      setImage(null);
      resetForm();
    }).catch(error => {
      setAlertStyle({
        content: "Nie udało się dodać wpisu",
        severity: "error"
      });
      setAlert(true);
    });
  }

  const handleFile = (event) => {
    setImage(event.target.files[0]);
  };

  return (
      <>
        <Paper component={Box} width={1} p={1}>
          <Formik
              initialValues={{
                entry: ''
              }}
              validationSchema={Yup.object({
                entry: Yup.string()
                .max(2000, "Wpisz nie więcej niż 2000 znaków")
                .min(10, "Wpisz co najmniej 10 znaków")
                .required("Treść wpisu nie może być pusta")
              })}
              onSubmit={(values, {resetForm}) => {
                handleAddEntry(values.entry, resetForm);
              }}>
            <Form autoComplete="off">
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={8} component={Box} height={1}>
                  <TextInput id={"entryInput"} name={"entry"} multiline rows={3}
                             inputProps={{maxLength: 2000}}/>
                  {
                    image &&
                    <Chip
                        label={image.name}
                        onDelete={() => setImage(null)}
                        component={Box} my={1}
                    />
                  }
                </Grid>
                <Grid item xs={12} md={6} lg={4} container
                      alignContent={"flex-start"}>
                  <Grid item xs={12} sm={7} md={12}>
                    <IconButton disabled>
                      <FormatBoldIcon/>
                    </IconButton>
                    <IconButton disabled>
                      <FormatItalicIcon/>
                    </IconButton>
                    <IconButton disabled>
                      <FormatQuoteIcon/>
                    </IconButton>
                    <IconButton disabled>
                      <InsertLinkIcon/>
                    </IconButton>
                    <input
                        accept="image/*"
                        type="file"
                        style={{display: "none"}}
                        onChange={handleFile}
                        ref={inputRef}
                    />
                    <IconButton id={"photo-button"}
                                onClick={() => setImageMenu(true)}>
                      <AddAPhotoIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={document.getElementById("photo-button")}
                        open={imageMenu}
                        onClose={() => setImageMenu(false)}
                    >
                      <MenuItem>
                        <Button variant={"text"} startIcon={<ComputerIcon/>}
                            onClick={() => {
                              inputRef.current.click();
                              setImageMenu(false);
                            }}>
                          Z komputera
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button variant={"text"} startIcon={<LinkIcon/>} disabled>
                          Z linku
                        </Button>
                      </MenuItem>
                    </Menu>
                    <Button disabled variant={"text"}>( ͡° ͜ʖ ͡°)</Button>
                  </Grid>
                  <Grid item xs={12} sm={5} md={12}>
                    <Button fullWidth startIcon={<PostAddIcon/>}
                            type={"submit"}>
                      Utwórz wpis
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>

        <Snackbar open={alert} autoHideDuration={6000}
                  onClose={() => setAlert(false)}>
          <Alert onClose={() => setAlert(false)} severity={alertStyle.severity}>
            {alertStyle.content}
          </Alert>
        </Snackbar>
      </>
  );
};

export default NewEntry;