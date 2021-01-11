import React, {useState} from "react";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {CardBody, CardHeader} from "../common/CardCustom";
import ForumIcon from '@material-ui/icons/Forum';
import LinkInternal from "../common/LinkInternal";
import {addPointToNews} from "../../util/apiUtils/NewsUtils";
import {dateTimeToWords} from "../../util/timeFormat";
import {getDomainFromLink} from "../../util/linkUtils";
import {
  ArrowDropUpIconCustom, BadgeCustom, CardCustom, CardFootCustom,
  ImageCustom,
  ImageDiv, ImageInfoBgBottom, ImageInfoBgTop, InfoDiv,
  NewsCoverLayout, NewsTitle, ReportIconCustom
} from "../../styles/allNews/newsCoverStyles";
import {Link} from "@material-ui/core";

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
      <NewsCoverLayout>
        <ImageDiv>
          <LinkInternal to={"/newsy/" + news.id}>
            <ImageCustom src={news.imageUrl}
                         alt="Brak obrazka"/>
          </LinkInternal>
          {
            props.isAuthenticated &&
            <ImageInfoBgTop>
              <ArrowDropUpIconCustom onClick={() => addPoint(news.id)}/>
              <b style={{margin: "0 10%"}}>{news.score}</b>
              <ReportIconCustom/>
            </ImageInfoBgTop>
          }
          <ImageInfoBgBottom>
            {dateTimeToWords(news.createdAt)}
            <BadgeCustom variant='light'>
              @{news.authorName}
            </BadgeCustom>
          </ImageInfoBgBottom>
        </ImageDiv>
        <InfoDiv>
          <CardCustom>
            <CardHeader>
              <LinkInternal to={"/newsy/" + news.id}>
                <NewsTitle>{news.title}</NewsTitle>
              </LinkInternal>
            </CardHeader>
            <CardBody style={{fontSize: '0.9em'}}>
              <LinkInternal to={"/newsy/" + news.id}>
                {news.description}
              </LinkInternal>
            </CardBody>
            <CardFootCustom>
              {
                news.link ?
                    <Link href={news.link} target="_blank">
                      <OpenInNewIcon/>
                      {getDomainFromLink(news.link)}
                    </Link>
                    :
                    <LinkInternal
                        to={"/newsy/" + news.id}
                        target="_blank">
                      <OpenInNewIcon/>
                      Do artykułu
                    </LinkInternal>
              }
              <LinkInternal style={{marginLeft: 'auto', width: 'auto'}}
                            to={"/newsy/" + news.id}>
                <ForumIcon/> Komentarze
              </LinkInternal>
            </CardFootCustom>
          </CardCustom>
        </InfoDiv>
      </NewsCoverLayout>
  );
}

export default NewsCover;
