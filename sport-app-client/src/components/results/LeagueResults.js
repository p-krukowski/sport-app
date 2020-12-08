import React, {useEffect, useState} from "react";
import { Typography } from "@material-ui/core";
import {
  fetchEventsByLeagueIdAndRoundNr,
  fetchNextEventsByLeagueId,
  fetchRecentEventsByLeagueId
} from "../../util/apiUtils/EventsUtils";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import {fetchRoundsAmountByLeagueId} from "../../util/apiUtils/LeaguesUtils";
import {RoundEventsResults} from "./RoundEventsResults";
import {EventsResults} from "./EventsResults";

export const LeagueResults = (props) => {

  const [lastEvents, setLastEvents] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const [round, setRound] = useState(1);
  const [roundEvents, setRoundEvents] = useState([]);
  const [roundsAmount, setRoundsAmount] = useState(0);

  useEffect(() => {
    let leagueId = 1;
    if (props.leagueId) {
      leagueId = props.leagueId;
    }
    fetchRecentEventsByLeagueId(leagueId)
    .then(fetchedEvents => {
      setLastEvents(fetchedEvents);
      setRound(fetchedEvents[0].roundNumber);
    })
    .catch(error => {
      console.log(new Error("Could not fetch last events"));
    });
    fetchNextEventsByLeagueId(leagueId)
    .then(fetchedEvents => {
      setNextEvents(fetchedEvents);
    })
    .catch(error => {
      console.log(new Error("Could not fetch next events"))
    });
    fetchEventsByLeagueIdAndRoundNr(leagueId, round)
    .then(fetchedEvents => {
      setRoundEvents(fetchedEvents);
    })
    .catch(error => {
      console.log(new Error("Could not fetch round events"))
    });
    fetchRoundsAmountByLeagueId(leagueId)
    .then(fetchedRoundsAmount => {
      setRoundsAmount(fetchedRoundsAmount);
    })
    .catch(error => {
      console.log(new Error("Could not fetch rounds amount"))
    });
  }, [props.leagueId])

  useEffect(() => {
    let leagueId = 1;
    if (props.leagueId) {
      leagueId = props.leagueId;
    }
    fetchEventsByLeagueIdAndRoundNr(leagueId, round)
    .then(fetchedEvents => {
      setRoundEvents(fetchedEvents);
    })
    .catch(error => {
      console.log(new Error("Could not fetch round events"))
    });
  }, [round])

  const handleChange = (event, value) => {
    setRound(value);
  };

  return (
      lastEvents &&
      <Grid container spacing={2} justify='center'>
        <Grid item md={6} xs={12}>
          <EventsResults events={lastEvents} title="Ostatnie spotkania"/>
        </Grid>
        <Grid item md={6} xs={12}>
          <EventsResults events={nextEvents} title="Następne spotkania"/>
        </Grid>
        <Grid item container alignContent='center' direction='column'>
          <Grid item>
            <Typography variant='h4' align='center'>
              Kolejka
            </Typography>
          </Grid>
          <Grid item>
            <Pagination
                color='primary'
                variant='outlined'
                count={roundsAmount}
                page={round}
                onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <RoundEventsResults events={roundEvents} />
        </Grid>
      </Grid>
  )
}