import React, {Component} from "react";
import styled from "styled-components";

import {getBestNews} from "../../util/apiUtils/NewsUtils";
import BestNews from "./BestNews";
import NextBestNews from "./NextBestNews";
import BestEntries from "./BestEntries";
import {getBestEntries} from "../../util/apiUtils/EntriesUtils";

class SocialPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsReady: false,
      entriesReady: false
    }
  }

  fetchBestNews = () => {
    getBestNews()
    .then(response => {
      this.setState({
        bestNews: response[0],
        news: response,
        newsReady: true
      })
    })
  }

  fetchBestEntries = () => {
    getBestEntries()
    .then(response => {
      this.setState({
        entries: response,
        entriesReady: true
      })
    })
  }

  componentDidMount() {
    this.fetchBestNews();
    this.fetchBestEntries();
  }

  render() {
    return (
        this.state.entriesReady && this.state.newsReady &&
        <SocialPanelLayout>
          <NewsPanel>
            <BestNewsColumn>
              {
                this.state.bestNews &&
                <BestNews news={this.state.bestNews}/>
              }
            </BestNewsColumn>
            <NextNewsColumn>
              <NextBestNews news={this.state.news}/>
            </NextNewsColumn>
          </NewsPanel>
          <BestEntries entries={this.state.entries}/>
        </SocialPanelLayout>
    );
  }
}

export default SocialPanel;

const SocialPanelLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  
  @media only screen and (min-width: 768px) {
    margin-right: 10px;
    margin-top: 0;
    width: 65%;
  }
`

const NewsPanel = styled.div`
  display: flex;
  flex-direction: column;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    height: 55%;
  }
`
const BestNewsColumn = styled.div`
  @media only screen and (min-width: 768px) {
    width: 70%;
  }  
`
const NextNewsColumn = styled.div`
  @media only screen and (min-width: 768px) {
    width: 30%;
  }  
`
