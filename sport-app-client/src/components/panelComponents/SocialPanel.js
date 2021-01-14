import React, {useEffect, useState} from "react";
import {getBestNews} from "../../util/apiUtils/NewsUtils";
import BestNews from "./BestNews";
import NextBestNews from "./NextBestNews";
import BestEntries from "./BestEntries";
import {getBestEntries} from "../../util/apiUtils/EntriesUtils";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const SocialPanel = () => {

  const [newsReady, setNewsReady] = useState(false);
  const [entriesReady, setEntriesReady] = useState(false);
  const [news, setNews] = useState();
  const [entries, setEntries] = useState();

  const fetchBestNews = () => {
    getBestNews()
    .then(response => {
      setNews(response);
      setNewsReady(true);
    })
    .catch(error => {
      console.log(new Error("Nie udało się pobrać newsów"), error)
    });
  };

  const fetchBestEntries = () => {
    getBestEntries()
    .then(response => {
      setEntries(response);
      setEntriesReady(true);
    })
    .catch(error => {
      console.log(new Error("Nie udało się pobrać wpisów"), error)
    });
  };

  useEffect(() => {
    fetchBestNews();
    fetchBestEntries();
  }, []);

  return (
      entriesReady && newsReady &&
      <Box display={"flex"} flexDirection={"column"} height={1}>
        <Box height={{md: 3 / 5}}>
          <Grid container component={Box} height={1} spacing={1}>
            <Grid item xs={12} md={8} component={Box} height={{xs: "50vw", md: 1}}>
              <BestNews news={news[0]}/>
            </Grid>
            <Grid item xs={12} md={4} component={Box} height={1}>
              <NextBestNews news={news}/>
            </Grid>
          </Grid>
        </Box>
        <Box height={{md: 2 / 5}} overflow={{md: "auto"}}>
          <Grid item xs={12}>
            <BestEntries entries={entries}/>
          </Grid>
        </Box>
      </Box>
  );
};

export default SocialPanel;
