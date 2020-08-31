import React, {Component} from 'react';

import Entry from "./Entry";

export default class AllEntries extends Component {

  render() {
    const entries = this.props.entries;
    return (
        <>
          {
            entries.map((entry) => (
                <Entry key={entry.id}
                       isAuthenticated={this.props.isAuthenticated}
                       entry={entry}/>
            ))
          }
        </>);
  }
}