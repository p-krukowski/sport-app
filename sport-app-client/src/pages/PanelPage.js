import React, {Component} from 'react';

import SocialPanel from "../components/panelComponents/SocialPanel";
import SportPanel from "../components/panelComponents/SportPanel";
import {PanelPageLayout} from "../styles/panel/panelPageStyles";

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