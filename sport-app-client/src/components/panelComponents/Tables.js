import React, {Component} from 'react';
import TableSoccer from "./TableSoccer";

class Tables extends Component {
  render() {
    return (
        <TableSoccer {...this.props}/>
    );
  }
}

export default Tables;
