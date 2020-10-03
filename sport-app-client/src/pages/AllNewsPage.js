import React, {Component} from "react";
import styled from "styled-components";

import AllNews from "../components/newsComponents/AllNews";
import NewNewsModal from "../components/newsComponents/NewNewsModal";
import Button from "../components/common/Button";
import DescriptionIcon from '@material-ui/icons/Description';

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

  render() {
    return (
        <AllNewsPageLayout>
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

          <NewNewsModal
              show={this.state.modalShow}
              onHide={() => this.setModalShow(false)}
          />
        </AllNewsPageLayout>
    )}
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