import React, {Component} from "react";
import styled from "styled-components";

import AllNews from "../components/newsComponents/AllNews";
import Button from "../components/common/Button";
import DescriptionIcon from '@material-ui/icons/Description';
import NewNewsModal from "../components/newsComponents/NewNewsModal";
import {uploadNewsCover} from "../util/apiUtils/MediaUploadUtils";
import {IconButton} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";

class AllNewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  setModalShow = (b) => {
    this.setState({
      modalShow: b
    })
  }

  state = {file: null}

  handleFile = (event) => {
    this.setState({file: event.target.files[0]})
  }

  handleUpload = () => {
    const formData = new FormData();
    formData.append("file", this.state.file);
    uploadNewsCover(formData)
    .then(res => {
      alert(res);
    });
  }

  render() {
    return (
        <AllNewsPageLayout>
          {/*<input*/}
          {/*    accept="image/*"*/}
          {/*    type="file"*/}
          {/*    style={{display: "none"}}*/}
          {/*    onChange={this.handleFile}*/}
          {/*    ref={fileInput => this.fileInput = fileInput}*/}
          {/*/>*/}
          {/*<IconButton color="primary" component="span"*/}
          {/*            onClick={() => this.fileInput.click()}>*/}
          {/*  <PhotoCamera/>*/}
          {/*</IconButton>*/}
          {/*<Button onClick={this.handleUpload}>Upload</Button>*/}
          {
            this.props.isAuthenticated &&
            <Button onClick={() => this.setModalShow(true)}
                    style={{marginBottom: '10px'}}>
              Utwórz nowy
              <DescriptionIcon style={{marginLeft: '5px'}}/>
            </Button>
          }
          <AllNews modalShow={this.state.modalShow}
                   isAuthenticated={this.props.isAuthenticated}/>

          <NewNewsModal open={this.state.modalShow}
                        setModalShow={this.setModalShow}/>
        </AllNewsPageLayout>
    )
  }
}

export default AllNewsPage;

const AllNewsPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  
  @media only screen and (min-width: 768px) {
    width: 50%;
    max-width: 850px;
    margin: 0 auto;
  }
`