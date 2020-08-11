import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {getBestNews} from "../../util/apiUtils/NewsUtils";
import BestNews from "./BestNews";


class SocialPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isComponentReady: false
        }
    }

    fetchBestNews = () => {
        getBestNews()
            .then(response => {
                this.setState({
                    bestNews: response[0],
                    news: response,
                    isComponentReady: true
                })
            })
    }

    componentDidMount() {
        this.fetchBestNews();
    }

    render() {
        return (
            this.state.isComponentReady &&
            <>
                <Row>
                    <Col>
                        <BestNews news={this.state.bestNews}/>
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    [Najlepsze wpisy]
                </Row>
            </>
        );
    }
}

export default SocialPanel;
