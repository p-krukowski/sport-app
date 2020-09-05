import React, {Component} from 'react';
import styled from "styled-components";

import AllEntries from "../components/entriesComponents/AllEntries";
import NewEntry from "../components/entriesComponents/NewEntry";
import {getAllEntries} from "../util/apiUtils/EntriesUtils";

class EntriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentReady: false
    }
  }

  getEntries = () => {
    getAllEntries()
    .then(response => {
      this.setState({
        entries: response,
        isComponentReady: true
      });
    });
  }

  componentDidMount() {
    this.getEntries();
  }

  render() {
    return (
        this.state.isComponentReady &&
        <EntriesPageLayout>
          {
            this.props.isAuthenticated &&
            <NewEntry getEntries={this.getEntries}/>
          }
          <AllEntries isAuthenticated={this.props.isAuthenticated}
                      entries={this.state.entries}/>
        </EntriesPageLayout>
    );
  }
}

export default EntriesPage;

const EntriesPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media only screen and (min-width: 768px) {
    width: 55%;
    max-width: 850px;
    margin: auto;
  }
`