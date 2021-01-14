import React from "react";
import {dateTimeToWords} from "../../util/timeFormat";
import {getDomainFromLink} from "../../util/linkUtils";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {Link} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Link as LinkDom} from "react-router-dom";
import {ZoomOnHover} from "../common/ZoomOnHover";
import {TextWithEllipsis} from "../common/TextWithEllipsis";
import Hidden from "@material-ui/core/Hidden";

const BestNews = props => {

  const news = props.news;

  return (
      <Box position={"relative"} width={1} height={1} overflow={"hidden"}>
        <ZoomOnHover height={1} time={".4s"} scale={"1.01"}>
          <Link component={LinkDom} to={"/newsy/" + news.id}>
            <img src={news.imageUrl} alt={"Brak zdjęcia"}
                 style={{height: "100%", width: "100%", objectFit: "cover"}}/>
          </Link>
          <Box width={1} position={"absolute"} bottom={0}
               bgcolor={"rgba(0,0,0,0.9)"} p={1}>
            <Link component={LinkDom} to={"/newsy/" + news.id}>
              <Hidden mdUp>
                <TextWithEllipsis mb={1} fontSize={"1.2rem"} lines={1}>
                  {news.title}
                </TextWithEllipsis>
              </Hidden>
              <Hidden smDown>
                <TextWithEllipsis mb={1} fontSize={"1.2rem"} lines={2}>
                  {news.title}
                </TextWithEllipsis>
              </Hidden>
            </Link>
            <Box width={1} display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"}>
                <Box fontWeight={"bold"}>
                  @{news.authorName}
                </Box>
                <Hidden smDown>
                  <Box mx={2}>
                    {dateTimeToWords(news.createdAt)}
                  </Box>
                </Hidden>
              </Box>
              <Link href={news.link} target={"_blank"}>
                <OpenInNewIcon/>
                {getDomainFromLink(news.link)}
              </Link>
            </Box>
          </Box>
        </ZoomOnHover>
      </Box>
  );
};

export default BestNews;
