import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {Box} from "@material-ui/core";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import { connect } from "react-redux";
import {setChosenLeague} from "../../actions/resultsActions";

const ResultsList = (props) => {

  const [leagues, setLeagues] = useState([]);
  const [openedId, setOpenedId] = useState(1);

  useEffect(() => {
    getAllLeaguesByDiscipline('soccer')
    .then(fetchedLeagues => {
      setLeagues(fetchedLeagues);
    })
    .catch(error => console.log(new Error('Discipline not found')))
  }, []);

  const openList = (id) => {
    id === openedId ?
        setOpenedId(null)
        :
        setOpenedId(id);
  }

  const isDisciplineOpened = (id) => {
    return openedId === id;
  };

  return (
      <List disablePadding>
        <ListItem button onClick={() => openList(1)}>
          <ListItemIcon>
            <SportsSoccerIcon/>
          </ListItemIcon>
          <ListItemText primary="Piłka nożna"/>
          {isDisciplineOpened(1) ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={isDisciplineOpened(1)}
                  timeout='auto'
                  unmountOnExit>
          <Box ml={6}>
            <List disablePadding>
              {
                leagues.length !== 0 && leagues.map(league => (
                    <ListItem key={league.id} button onClick={() => props.setLeague(league)}>
                      <ListItemText primary={league.name}/>
                    </ListItem>
                ))
              }
            </List>
          </Box>
        </Collapse>
      </List>
  )
}

const mapStateToProps = (state) => {
  return {
    league: state.chosenLeague
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLeague: (league) => {
      dispatch(setChosenLeague(league));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);