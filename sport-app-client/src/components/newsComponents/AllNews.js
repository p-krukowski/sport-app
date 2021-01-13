import React, {useEffect, useState} from "react";
import NewsCover from "./NewsCover";
import {fetchAllNews} from "../../util/apiUtils/NewsUtils";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {CircularProgress} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

const AllNews = (props) => {

  const [allNews, setAllNews] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchAllNews()
    .then(response => {
      setAllNews(response);
      setFetching(false);
    })
    .catch(error => {
      console.log(new Error("Nie udało się pobrać newsów"), error);
    })
  }, []);

  return (
      <Grid container spacing={1}>
        <Hidden xsUp={!fetching}>
          <Box height={200} width={"100%"}
               display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress/>
          </Box>
        </Hidden>
        {
          allNews && allNews.map(news => (
              <Grid item xs={12} key={news.id}>
                <NewsCover news={news}
                           isAuthenticated={props.isAuthenticated}/>
              </Grid>
          ))
        }
      </Grid>
  );
}

export default AllNews;
