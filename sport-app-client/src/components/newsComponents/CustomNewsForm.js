import React, {useEffect, useRef, useState} from "react";
import {addNews} from "../../util/apiUtils/NewsUtils";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {TextInput} from "../common/customInputs";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import PanoramaSharpIcon from '@material-ui/icons/PanoramaSharp';
import {CircularProgress, IconButton} from "@material-ui/core";
import {uploadNewsCover} from "../../util/apiUtils/MediaUploadUtils";
import Hidden from "@material-ui/core/Hidden";
import {deleteNewsCoverFromUrl} from "../../util/apiUtils/MediaDeleteUtils";
import {connect} from "react-redux";
import {setShowNewNewsModal} from "../../actions/modalsActions";
import {DEFAULT_NEWS_COVER} from "../../constants";
import Box from "@material-ui/core/Box";

const CustomNewsForm = (props) => {

  const [imageUrl, setImageUrl] = useState(DEFAULT_NEWS_COVER);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingComplete, setUploadingComplete] = useState(false);

  const inputRef = useRef();

  const handleFile = (event) => {
    if (uploadingComplete) {
      handleDelete();
    }
    setUploadingImage(true);
    uploadImage(event.target.files[0]);
  };

  const uploadImage = (file) => {
    const formData = new FormData();

    formData.append("file", file);
    uploadNewsCover(formData)
    .then(fetchedImageUrl => {
      setImageUrl(fetchedImageUrl);
      setUploadingImage(false);
      setUploadingComplete(true);
    })
    .catch(error => {
      console.log(new Error(error));
      setUploadingImage(false);
    });
  }

  const handleCreate = (values) => {
    const news = {
      title: values.title,
      description: values.description,
      imageURL: imageUrl,
      content: values.content,
      tags: values.tags
    }
    addNews(news)
    .then(response => {
      window.location.reload();
    });
  }

  const handleDelete = () => {
    deleteNewsCoverFromUrl(imageUrl)
    .then(response => {
    })
    .catch(error => {
      alert(error);
    })
  }

  useEffect(() => {
    if (!props.showModal && uploadingComplete) {
      handleDelete();
    }
  }, [props.showModal])

  return (
      <Box display={"flex"} flexDirection={"column"} mt={"10px"}>
        <Formik
            initialValues={{
              title: '',
              description: '',
              content: '',
              tags: ''
            }}
            validationSchema={Yup.object({
              title: Yup.string()
              .max(90, "Wpisz nie więcej niż 90 znaków")
              .min(10, "Wpisz co najmniej 10 znaków")
              .required("To pole jest wymagane"),
              description: Yup.string()
              .max(350, "Wpisz nie więcej niż 350 znaków")
              .min(10, "Wpisz co najmniej 10 znaków")
              .required("To pole jest wymagane"),
              content: Yup.string()
              .min(400, "Wpisz co najmniej 400 znaków")
              .required("To pole jest wymagane"),
              tags: Yup.string()
              .max(100, "Wpisz nie więcej niż 100 znaków")
            })}
            onSubmit={(values, {setSubmitting}) => {
              handleCreate(values);
            }}>
          <Form autoComplete="off">
            <Grid container spacing={1}>
              <Grid item container spacing={1}>
                <Grid item xs={8} container spacing={1}>
                  <Grid item xs={12}>
                    <TextInput
                        name="title"
                        inputProps={{maxLength: 90}}
                        label="Tytuł"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                        name="description"
                        multiline
                        rows={3}
                        inputProps={{maxLength: 350}}
                        label="Opis..."
                    />
                  </Grid>
                </Grid>
                <Grid item xs>
                  <input
                      accept="image/*"
                      type="file"
                      style={{display: "none"}}
                      onChange={handleFile}
                      ref={inputRef}
                  />
                  <IconButton
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px"
                      }}
                      onClick={() => inputRef.current.click()}
                  >
                    <Hidden xsUp={uploadingImage || uploadingComplete}>
                      <PanoramaSharpIcon style={{fontSize: '120px'}}/>
                    </Hidden>
                    <Hidden xsUp={!uploadingImage}>
                      <CircularProgress/>
                    </Hidden>
                    <Hidden xsUp={!uploadingComplete}>
                      <img src={imageUrl} alt="Brak obrazka"
                           style={{maxHeight: "120px", maxWidth: "100%"}}/>
                    </Hidden>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                    name="content"
                    inputProps={{minLength: 400}}
                    label="Treść artykułu"
                    multiline
                    rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                    name="tags"
                    inputProps={{maxLength: 100}}
                    label="#tag1 #tag2 ..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={uploadingImage}
                >
                  Utwórz
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomNewsForm);
