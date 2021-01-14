import React from "react";

import LinkInternal from "../common/LinkInternal";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {getDomainFromLink} from "../../util/linkUtils";
import {
  Image,
  Info, News, NextBestNewsLayout,
  SourceUrlDiv,
  Title
} from "../../styles/panel/nextBestNewsStyles";
import Badge from "react-bootstrap/Badge";
import Box from "@material-ui/core/Box";
import {ZoomOnHover} from "../common/ZoomOnHover";
import {Link as LinkDom} from "react-router-dom";
import {Link} from "@material-ui/core";
import {TextWithEllipsis} from "../common/TextWithEllipsis";
import Hidden from "@material-ui/core/Hidden";
import {dateTimeToWords} from "../../util/timeFormat";

const setMargin = (index, lastElementIndex) => {
  if (index !== lastElementIndex) {
    return 1;
  } else {
    return 0;
  }
}

const NextBestNews = props => (
    <Box height={1}>
      {
        props.news.map((news, index) => (
            index > 0 &&
            <Box pb={setMargin(index, props.news.length - 1)}
                 height={{xs: "50vw", md: 1 / 3}}>
              <Box position={"relative"} height={1} overflow={"hidden"}>
                <ZoomOnHover time={".4s"} scale={"1.03"} height={1}>
                  <Link component={LinkDom} to={"/newsy/" + news.id}>
                    <img src={news.imageUrl} alt={"Brak zdjęcia"}
                         style={{
                           height: "100%",
                           width: "100%",
                           objectFit: "cover"
                         }}/>
                  </Link>
                  <Box position={"absolute"} bottom={0}
                       bgcolor={"rgba(0,0,0,0.9)"} p={1 / 2} width={1}>
                    <TextWithEllipsis lines={1} mb={"5px"}>
                      {news.title}
                    </TextWithEllipsis>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Hidden mdUp>
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
                      </Hidden>
                      {
                        news.link ?
                            <Link href={news.link} target="_blank">
                              <OpenInNewIcon/>
                              {getDomainFromLink(news.link)}
                            </Link>
                            :
                            <Hidden smDown>
                              <Box fontWeight={"bold"}>
                                @{news.authorName}
                              </Box>
                            </Hidden>
                      }
                    </Box>
                  </Box>
                </ZoomOnHover>
              </Box>
            </Box>
        ))
      }
    </Box>

    // <News key={index}>
    //   <LinkInternal to={"/newsy/" + news.id}>
    //     <Image src={news.imageUrl}
    //            alt="Brak zdjęcia"/>
    //     <Info>
    //       <Title>{news.title}</Title>

    //     </Info>
    //   </LinkInternal>
    // </News>
);

export default NextBestNews;