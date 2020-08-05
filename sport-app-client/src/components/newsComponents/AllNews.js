import React, {Component} from "react";
import News from "./News";
import {getAllNews} from "../../util/apiUtils/NewsUtils";

class AllNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allNews: []
        };
    }

    fetchAllNews() {
        getAllNews()
            .then(response => {
                this.setState({
                    allNews: response
                })
            })
            .catch(error => {

            })
    }

    componentDidMount() {
        this.fetchAllNews();
    }

    render() {
        return (
            <>
                {
                    this.state.allNews && this.state.allNews.map(news => (
                        <News key={news.id} news={news} />
                    ))
                }
            </>
        );
    }
}

export default AllNews;
