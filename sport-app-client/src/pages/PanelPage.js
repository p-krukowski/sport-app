import React, {Component} from 'react';
import styled from "styled-components";

import SocialPanel from "../components/panelComponents/SocialPanel";
import SportPanel from "../components/panelComponents/SportPanel";

class PanelPage extends Component {

  render() {
    return (
        <PanelPageLayout>
          <SocialPanel/>
          <SportPanel {...this.props}/>
        </PanelPageLayout>
    );
  }
}

export default PanelPage;

const PanelPageLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`