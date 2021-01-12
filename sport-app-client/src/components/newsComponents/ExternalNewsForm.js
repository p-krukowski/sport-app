import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Image} from "react-bootstrap";
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

const ExternalNewsForm = (props) => {

  const [fetching, setFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [fetchedContent, setFetchedContent] = useState({
    imageURL: DEFAULT_NEWS_COVER,
    title: '',
    description: '',
    link: ''
  });

  const loadFromLink = (url) => {
    setFetching(true);
    fetchArticle(url)
    .then(response => {
      setFetchedContent({
        title: response.title,
        description: response.description,
        imageURL: response.imageURL,
        link: url
      });
      setFetching(false);
      setIsFetched(true);
    })
    .catch(error => {
      console.log(new Error("Nie udało się utworzyć newsa"), error);
    })
  }

  const handleCreate = (values) => {
    const formData = new FormData();
    formData.append("imageUrl", fetchedContent.imageURL);
    uploadNewsCoverFromUrl(formData)
    .then(fetchedImageUrl => {
      const content = {
        title: values.title,
        description: values.description,
        imageURL: fetchedImageUrl,
        link: values.url
      }
      addNews(content)
      .then(response => {
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
      <ExternalNewsFormLayout>
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
            <UrlDiv>
              <TextInput
                  name="url"
                  label="Link: https://"
                  disabled={fetching}
              />
              <Button type="submit" variant="outlined" color="primary">
                <SystemUpdateAltIcon color="primary"/>
              </Button>
            </UrlDiv>
          </Form>
        </Formik>
        {
          fetching ?
              <LinearProgress/>
              :
              <LinearProgress variant="determinate" value={0}/>
        }
        <Formik
            enableReinitialize
            initialValues={{
              url: fetchedContent.link,
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
            <BasicDataLayout>
              <Inputs>
                <TextInput
                    name="title"
                    inputProps={{maxLength: 90}}
                    label="Tytuł"
                    disabled={!isFetched}
                />
                <TextInput
                    name="description"
                    multiline
                    rows={3}
                    inputProps={{maxLength: 350}}
                    label="Opis..."
                    disabled={!isFetched}
                />
              </Inputs>
              <Image src={fetchedContent.imageURL}
                     rounded
                     fluid
                     style={{height: "145px"}}/>
            </BasicDataLayout>
            <TextInput
                name="tags"
                inputProps={{maxLength: 100}}
                label="#tag1 #tag2 ..."
                disabled={!isFetched}
            />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
            >
              Utwórz
            </Button>
          </Form>
        </Formik>
      </ExternalNewsFormLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExternalNewsForm);

const ExternalNewsFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  form > * {
    margin-top: 10px;
  }
`
const BasicDataLayout = styled.div`
  display: flex;
`
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const UrlDiv = styled.div`
  display: flex;
`