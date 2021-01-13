import React, {useState} from "react";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ForumIcon from '@material-ui/icons/Forum';
import {addPointToNews} from "../../util/apiUtils/NewsUtils";
import {dateTimeToWords} from "../../util/timeFormat";
import {getDomainFromLink} from "../../util/linkUtils";
import {Divider, IconButton, Link, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import {Link as LinkDom} from "react-router-dom";

const NEWS_COVER_HEIGHT = {
  xs: "auto", sm: "150px"
}

const NEWS_COVER_IMAGE_HEIGHT = {
  xs: "40vw", sm: "150px"
}

const NewsCover = (props) => {

  const [news, setNews] = useState(props.news);

  const addPoint = (newsId) => {
    addPointToNews(newsId)
    .then(response => {
      setNews({
        ...news,
        score: response
      })
    })
  }

  return (
      <Paper style={{overflow: "hidden"}}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Box height={NEWS_COVER_IMAGE_HEIGHT} width={1}
                 position={"relative"}>
              <Link component={LinkDom} to={"/newsy/" + news.id}>
                <img src={news.imageUrl} alt={"Brak obrazka"}
                     style={{
                       height: "100%",
                       width: "100%",
                       objectFit: "cover"
                     }}/>
              </Link>
              <Box p={"-5px"} width={1} display={"flex"}
                   justifyContent={"center"}
                   alignItems={"center"}
                   position={"absolute"} top={0} bgcolor={"rgba(0,0,0,0.9)"}>
                <Hidden xsUp={!props.isAuthenticated}>
                  <IconButton size={"small"} onClick={() => addPoint(news.id)}>
                    <Box fontWeight={"bold"} fontSize={"1.2rem"}>+</Box>
                    <Box mx={1} fontSize={"1.2rem"}>
                      {news.score}
                    </Box>
                  </IconButton>
                </Hidden>
                <Hidden xsUp={props.isAuthenticated}>
                  <Box fontWeight={"bold"} fontSize={"1.2rem"}>+</Box>
                  <Box mx={1} fontSize={"1.2rem"}>
                    {news.score}
                  </Box>
                </Hidden>
              </Box>
              <Box p={"5px 10px"} fontSize={"0.8rem"} width={1}
                   display={"flex"} justifyContent={"space-between"}
                   position={"absolute"} bottom={0} bgcolor={"rgba(0,0,0,0.9)"}>
                <Box fontSize={"0.9rem"}>
                  {dateTimeToWords(news.createdAt)}
                </Box>
                <Box fontSize={"0.9rem"} fontWeight={"bold"}>
                  @{news.authorName}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Box height={NEWS_COVER_HEIGHT}
                 display={"flex"} flexDirection={"column"}>
              <Box p={"5px 10px"} whiteSpace={"nowrap"} width={1}>
                <Link component={LinkDom} to={"/newsy/" + news.id}>
                  <Box overflow={"hidden"} textOverflow={"ellipsis"}
                       fontWeight={"fontWeightBold"}
                       lineHeight={"1.2"} fontSize={"0.9rem"}>
                    {news.title}
                  </Box>
                </Link>
              </Box>
              <Divider/>
              <Box p={"5px 10px"} fontSize={"0.8rem"} overflow={"auto"}
                   display={"flex"} flexGrow={1}>
                <Link component={LinkDom} to={"/newsy/" + news.id}>
                  {news.description}
                </Link>
              </Box>
              <Divider/>
              <Box p={"5px 10px"} fontSize={"0.9rem"}
                   display={"flex"} justifyContent={"space-between"}>
                {
                  news.link ?
                      <Link href={news.link} target="_blank">
                        <Box display={"flex"} alignItems={"center"}>
                          <OpenInNewIcon style={{fontSize: "1.05em"}}/>
                          <Box ml={1}>
                            {getDomainFromLink(news.link)}
                          </Box>
                        </Box>
                      </Link>
                      :
                      <Link component={LinkDom}
                            to={"/newsy/" + news.id}
                            target="_blank">
                        <Box display={"flex"} alignItems={"center"}>
                          <OpenInNewIcon style={{fontSize: "1.05em"}}/>
                          <Box ml={1}>
                            Do artykułu
                          </Box>
                        </Box>
                      </Link>
                }
                <Link component={LinkDom} to={"/newsy/" + news.id}>
                  <Box display={"flex"} alignItems={"center"}>
                    <ForumIcon style={{fontSize: "1.05em"}}/>
                    <Box ml={1}>
                      Komentarze
                    </Box>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
  );
}

export default NewsCover;
