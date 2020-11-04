import React, {Component} from "react";
import {Image} from "react-bootstrap";
import {addNews} from "../../util/apiUtils/NewsUtils";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {TextInput} from "../common/customInputs";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

class CustomNewsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: {
                imageURL: 'https://portalkomunalny.pl/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
                title: '',
                description: '',
                content: ''
            }
        }
    }

    handleCreate = (values) => {
        const news = {
            title: values.title,
            description: values.description,
            imageURL: this.state.news.imageURL,
            content: values.content
        }
        addNews(news)
        .then(response => {
            window.location.reload();
        });
    }

    render() {
        return (
            <CustomNewsFormLayout>
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
                        .required("To pole jest wymagane")
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        this.handleCreate(values);
                    }}>
                    <Form autoComplete="off">
                        <BasicDataLayout>
                            <Inputs>
                                <TextInput
                                    name="title"
                                    inputProps={{maxLength: 90}}
                                    label="Tytuł"
                                />
                                <TextInput
                                    name="description"
                                    multiline
                                    rows={3}
                                    inputProps={{maxLength: 350}}
                                    label="Opis..."
                                />
                            </Inputs>
                            <Image src={this.state.news.imageURL}
                                   rounded
                                   fluid
                                   style={{height: "145px"}}/>
                        </BasicDataLayout>
                        <TextInput
                            name="content"
                            inputProps={{minLength: 400}}
                            label="Treść artykułu"
                            multiline
                            rows={4}
                        />
                        <TextInput
                            name="tags"
                            inputProps={{maxLength: 100}}
                            label="#tag1 #tag2 ..."
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
            </CustomNewsFormLayout>
        );
    }
}

export default CustomNewsForm;

const CustomNewsFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;

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