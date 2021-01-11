import React, {useEffect, useState} from "react";
import NewsCover from "./NewsCover";
import {getAllNews} from "../../util/apiUtils/NewsUtils";
import Grid from "@material-ui/core/Grid";

const AllNews = (props) => {

  const [allNews, setAllNews] = useState([]);

  const fetchAllNews = () => {
    getAllNews()
    .then(response => {
      setAllNews(response);
    })
    .catch(error => {

    })
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
      <Grid container spacing={1}>
        {
          allNews && allNews.map(news => (
              <Grid item key={news.id}>
                <NewsCover news={news}
                           isAuthenticated={props.isAuthenticated}/>
              </Grid>
          ))
        }
      </Grid>
  );
}

export default AllNews;
