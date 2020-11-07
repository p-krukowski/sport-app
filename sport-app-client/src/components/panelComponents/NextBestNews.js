import React, {Component} from "react";

import LinkBlank from "../common/LinkBlank";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {getDomainFromLink} from "../../util/linkUtils";
import {
  Image,
  Info, News, NextBestNewsLayout,
  SourceUrlDiv,
  Title
} from "../../styles/panel/nextBestNewsStyles";
import Badge from "react-bootstrap/Badge";

class NextBestNews extends Component {
  render() {
    return (
        <NextBestNewsLayout>
          {
            this.props.news.map((news, index) => (
                index > 0 &&
                <News key={index}>
                  <LinkBlank to={"/newsy/" + news.id}>
                    <Image src={news.imageUrl}
                           alt="Brak zdjęcia"/>
                    <Info>
                      <Title>{news.title}</Title>
                      {
                        news.link ?
                            <SourceUrlDiv href={news.link} target="_blank">
                              <OpenInNewIcon/>
                              {getDomainFromLink(news.link)}
                            </SourceUrlDiv>
                            :
                            <Badge variant="light" style={{fontSize: '0.6em'}}>
                              @{news.authorName}
                            </Badge>
                      }
                    </Info>
                  </LinkBlank>
                </News>
            ))
          }
        </NextBestNewsLayout>
    );
  }
}

export default NextBestNews;