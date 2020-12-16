import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {LeagueTable} from "./LeagueTable";
import {LeagueResults} from "./LeagueResults";
import {Box} from "@material-ui/core";
import {getLeague} from "../../util/apiUtils/LeaguesUtils";
import CircularProgress from "@material-ui/core/CircularProgress";

const Results = (props) => {

  const [showedComponent, setShowedComponent] = useState('results');
  const [league, setLeague] = useState();

  useEffect(() => {
    let leagueId = 1;
    if (props.league) {
      leagueId = props.league.id;
    }
    getLeague(leagueId)
    .then(fetchedLeague => {
      setLeague(fetchedLeague);
    })
    .catch(error => {
      console.log(new Error("Cannot fetch date"));
    })
  }, [props.league])

  return (
      league ?
          <ResultsLayout>
            <h2>{league.name}</h2>
            <Box mb={2}>
              <ButtonGroup size='large' color='primary'>
                <Button
                    variant={showedComponent === 'table' ? 'contained' : ''}
                    onClick={() => setShowedComponent('table')}
                >
                  Tabela
                </Button>
                <Button
                    variant={showedComponent === 'results' ? 'contained' : ''}
                    onClick={() => setShowedComponent('results')}
                >
                  Wyniki
                </Button>
              </ButtonGroup>
            </Box>
            {
              showedComponent === 'table' ?
                  <LeagueTable league={league}>

                  </LeagueTable>
                  :
                  <LeagueResults leagueId={league.id}>

                  </LeagueResults>
            }
          </ResultsLayout>
          :
          <LoadingLayout>
            <CircularProgress color="inherit" />
          </LoadingLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    league: state.results.chosenLeague
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Results);

const ResultsLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`
const LoadingLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
`