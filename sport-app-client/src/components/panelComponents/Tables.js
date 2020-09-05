import React, {Component} from 'react';
import TableSoccer from "./TableSoccer";

class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLeague: this.props.leagues[0]
    };
  }

  changeTable = (id) => {
    for (let league of this.props.leagues) {
      if (league.id == id) {
        this.setState({
          currentLeague: league
        });
      }
    }
  }

  render() {
    return (
        <TableSoccer league={this.state.currentLeague}/>
    );
  }
}

export default Tables;
