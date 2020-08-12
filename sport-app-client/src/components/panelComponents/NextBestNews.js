import React, {Component} from "react";
import {Col} from "react-bootstrap";

import styled from "styled-components";

class NextBestNews extends Component {
    render() {
        return (
            <ColCustom>
                <News>
                    <img src={this.props.news[1].imageUrl}
                         alt="Brak zdjęcia"
                         style={{
                             height: '100%',
                             width: '100%',
                             objectFit: 'cover'}}/>
                </News>
                <News>
                    <img src={this.props.news[2].imageUrl}
                         alt="Brak zdjęcia"
                         style={{
                             height: '100%',
                             width: '100%',
                             objectFit: 'cover'}}/>
                </News>
                <News>
                    <img src={this.props.news[3].imageUrl}
                         alt="Brak zdjęcia"
                         style={{
                             height: '100%',
                             width: '100%',
                             objectFit: 'cover'}}/>
                </News>
            </ColCustom>
        );
    }
}

export default NextBestNews;

const News = styled.div`
  width: 100%;
  height: 33%;
`

const ColCustom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`
