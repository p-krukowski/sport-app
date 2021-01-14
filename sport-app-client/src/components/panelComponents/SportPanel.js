import React, {useEffect, useState} from "react";
import SportDataCard from "./SportDataCard";
import LeaguePickModal from "./LeaguePickModal";
import {fetchUserLeagues} from "../../util/apiUtils/UserUtils";
import {getAllLeaguesByDiscipline} from "../../util/apiUtils/LeaguesUtils";
import Button from "@material-ui/core/Button";
import {ButtonAdjusted} from "../../styles/panel/sportPanelStyles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from "@material-ui/core/Box";
import {Divider, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const SportPanel = props => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComponentReady, setIsComponentReady] = useState(false);
  const [leagues, setLeagues] = useState();
  const [league, setLeague] = useState();

  const handleModal = () => {
    setIsModalVisible(!isModalVisible)
  };

  const getUserLeagues = () => {
    fetchUserLeagues()
    .then(response => {
      setLeagues(response);
      setLeague(response[0]);
      setIsComponentReady(true);
    })
    .catch(error => {
      console.log(new Error("Nie udało się pobrać lig"), error)
    })
  };

  const fetchData = () => {
    if (props.isAuthenticated) {
      getUserLeagues();
    } else {
      getAllLeaguesByDiscipline("soccer")
      .then(response => {
        setLeagues(response);
        setLeague(response[0]);
        setIsComponentReady(true);
      })
      .catch(error => {
        console.log(new Error("Nie udało się pobrać lig"), error)
      })
    }
  };

  useEffect(() => fetchData(), []);

  return (
      isComponentReady &&
      <Paper>
        <Grid container
              component={Box} height={1} overflow={"auto"}>
          <Grid item xs={12}>
            <Box p={1} display={"flex"} alignItems={"center"}>
              {
                props.isAuthenticated && leagues.length !== 0 ?
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} width={1}>
                      <Box>Moje ligi</Box>
                      <Button
                          variant='outlined'
                          onClick={handleModal}
                      >
                        Zmień
                      </Button>
                    </Box>
                    :
                    <Box>
                      <div>Wyniki</div>
                    </Box>
              }
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={12}
                component={Box} p={1} display={"flex"} flexDirection={"column"}
                alignItems={"center"}>
            {
              leagues.length === 0 ?
                  <ButtonAdjusted
                      variant='outlined'
                      onClick={handleModal}
                  >
                    <AddCircleOutlineIcon color='primary' fontSize='large'/>
                    <span>Dodaj ligi</span>
                  </ButtonAdjusted>
                  :
                  <>
                    <Box m={1}>
                      <FormControl variant='outlined'>
                        <InputLabel>Liga</InputLabel>
                        <Select value={league}
                                onChange={(e) => setLeague(e.target.value)}>
                          {
                            leagues &&
                            leagues.map(leagueSelect => (
                                <MenuItem key={leagueSelect.id} value={leagueSelect}>
                                  {leagueSelect.name}
                                </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
                    <SportDataCard {...props}
                                   league={league}/>
                  </>
            }
          </Grid>
        </Grid>

        <LeaguePickModal show={isModalVisible}
                         handleModal={handleModal}
                         leagues={leagues}/>
      </Paper>
  );
};

export default SportPanel;