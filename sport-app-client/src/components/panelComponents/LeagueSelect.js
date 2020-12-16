import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class LeagueSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      league: this.props.league,
      leagues: this.props.leagues
    }
  }

  handleChange = (e) => {
    this.setState({
      league: e.target.value
    })
    this.props.setLeague(e.target.value)
  }

  render() {

    const {league, leagues} = this.state;
    return (
        <FormControl variant='outlined'>
          <InputLabel id="customized-select-label">Liga</InputLabel>
          <Select
              labelId="customized-select-label"
              id="demo-customized-select"
              value={league}
              onChange={this.handleChange}
          >
            {
              leagues &&
              leagues.map(league => (
                  <MenuItem key={league.id} value={league}>
                    {league.name}
                  </MenuItem>
              ))
            }
          </Select>
        </FormControl>
    );
  }
}

export default LeagueSelect;