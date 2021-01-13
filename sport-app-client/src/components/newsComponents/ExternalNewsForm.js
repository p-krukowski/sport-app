import React, {useEffect, useState} from "react";
import {fetchArticle} from "../../util/scrape";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import {TextInput} from "../common/customInputs";
import * as Yup from 'yup';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {addNews} from "../../util/apiUtils/NewsUtils";
import {DEFAULT_NEWS_COVER} from "../../constants";
import {uploadNewsCoverFromUrl} from "../../util/apiUtils/MediaUploadUtils";
import {setShowNewNewsModal} from "../../actions/modalsActions";
import {connect} from "react-redux";
import {deleteNewsCoverFromUrl} from "../../util/apiUtils/MediaDeleteUtils";
import Grid from "@material-ui/core/Grid";
import {Box, CircularProgress, Hidden} from "@material-ui/core";

const ExternalNewsForm = (props) => {

      const [fetching, setFetching] = useState(false);
      const [isFetched, setIsFetched] = useState(false);
      const [uploading, setUploading] = useState(false);
      const [fetchedContent, setFetchedContent] = useState({
        imageURL: DEFAULT_NEWS_COVER,
        title: '',
        description: '',
        url: ''
      });

      const loadFromLink = (url) => {
        setFetching(true);
        fetchArticle(url)
        .then(response => {
          setFetchedContent({
            title: response.title,
            description: response.description,
            imageURL: response.imageURL,
            url: url
          });
          setFetching(false);
          setIsFetched(true);
        })
        .catch(error => {
          console.log(new Error("Nie udało się utworzyć newsa"), error);
        })
      }

      const handleCreate = (values) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("imageUrl", fetchedContent.imageURL);
        uploadNewsCoverFromUrl(formData)
        .then(fetchedImageUrl => {
          console.log(fetchedContent)
          const content = {
            title: values.title,
            description: values.description,
            imageURL: fetchedImageUrl,
            url: fetchedContent.url
          }
          addNews(content)
          .then(response => {
            setUploading(false);
            window.location.reload();
          })
          .catch(error => {
            console.log(new Error("Nie udało się utworzyć newsa"), error);
          })
        })
        .catch(error => {
          console.log(new Error("Nie udało się zapisać obrazka"), error);
        })
      }

      useEffect(() => {
        if (!props.showModal && isFetched) {
          deleteNewsCoverFromUrl(fetchedContent.imageURL)
          .then(response => {
          })
          .catch(error => {
            alert(error);
          })
        }
      }, [props.showModal])

      return (
          <Box display={"flex"} flexDirection={"column"} mt={"10px"}>
            <Grid container>
              <Grid item xs={12}>
                <Formik
                    initialValues={{
                      url: ''
                    }}
                    validationSchema={Yup.object({
                      url: Yup.string()
                      .url("Wpisany link jest niepoprawny")
                      .required("Najpierw wpisz link")
                    })}
                    onSubmit={values => {
                      loadFromLink(values.url);
                    }}>
                  <Form autoComplete="off">
                    <Box display={"flex"} width={"100%"}>
                      <TextInput
                          name="url"
                          label="Link: https://"
                          disabled={fetching || uploading}
                      />
                      <Button type="submit" variant="outlined" color="primary"
                              disabled={fetching || uploading}>
                        <SystemUpdateAltIcon color="primary"/>
                      </Button>
                    </Box>
                  </Form>
                </Formik>
              </Grid>
              <Grid item xs={12}>
                {
                  fetching ?
                      <LinearProgress/>
                      :
                      <LinearProgress variant="determinate" value={0}/>
                }
              </Grid>
              <Grid item xs={12}>
                <Box mt={"10px"}>
                  <Formik
                      enableReinitialize
                      initialValues={{
                        title: fetchedContent.title,
                        description: fetchedContent.description,
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
                      })}
                      onSubmit={(values, {setSubmitting}) => {
                        handleCreate(values);
                      }}>
                    <Form autoComplete="off">
                      <Grid container spacing={1}>
                        <Grid item xs={12} container spacing={1}>
                          <Grid item xs={8} container spacing={1}>
                            <Grid item xs={12}>
                              <TextInput
                                  name="title"
                                  inputProps={{maxLength: 90}}
                                  label="Tytuł"
                                  disabled={!isFetched || uploading || fetching}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextInput
                                  name="description"
                                  multiline
                                  rows={3}
                                  inputProps={{maxLength: 350}}
                                  label="Opis..."
                                  disabled={!isFetched || uploading || fetching}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs>
                            <Button variant={"text"} style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "5px"
                            }}>
                              <img src={fetchedContent.imageURL} alt="Brak obrazka"
                                   style={{maxHeight: "120px", maxWidth: "100%"}}/>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={1}
                              alignItems={"center"}>
                          <Grid item xs={12}>
                            <TextInput
                                name="tags"
                                inputProps={{maxLength: 100}}
                                label="#tag1 #tag2 ..."
                                disabled={!isFetched || uploading || fetching}
                            />
                          </Grid>
                          <Grid item>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={!isFetched || uploading || fetching}
                            >
                              Utwórz
                            </Button>
                          </Grid>
                          <Grid item>
                            <Hidden xsUp={!uploading}>
                              <CircularProgress size={"1em"}/>
                            </Hidden>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  </Formik>
                </Box>
              </Grid>
            </Grid>
          </Box>
      );
    }
;

const mapStateToProps = (state) => {
      return {
        showModal: state.modals.showNewNewsModal
      };
    }
;

const mapDispatchToProps = (dispatch) => {
      return {
        setShowModal: showModal => {
          dispatch(setShowNewNewsModal(showModal));
        }
      };
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(ExternalNewsForm);