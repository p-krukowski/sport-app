import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
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
            <>
                <Row style={{height: '55%', margin: 0}}>
                    <Col md='9' style={{padding: "0", height: '100%'}}>
                        <BestNews news={this.state.bestNews}/>
                    </Col>
                    <Col md='3' style={{paddingLeft: "5px", paddingRight: "0px", height: '100%'}}>
                        <NextBestNews news={this.state.news} />
                    </Col>
                </Row>
                <Row style={{height: '35%', margin: 0}}>
                    <BestEntries entries={this.state.entries} />
                </Row>
            </>
        );
    }
}

export default SocialPanel;
