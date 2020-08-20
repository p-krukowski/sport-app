import React, {Component} from "react";
import styled from "styled-components";
import Button from "../common/Button";
import ResultSoccerTable from "./ResultSoccerTable";
import {theme} from "../../util/theme";

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'table'
        }
    }

    handleButtonClick = (buttonName) => {
        this.setState({
            page: buttonName
        })
    }

    render() {
        return (
            <ResultsLayout>
                <ResultTitle>
                    {this.props.league.name}
                </ResultTitle>
                <ResultsButtonGroup>
                    <Button name='events' onClick={(e) => this.handleButtonClick(e.target.name)}>
                        Spotkania
                    </Button>
                    <Button name='table' onClick={(e) => this.handleButtonClick(e.target.name)}>
                        Tabela
                    </Button>
                </ResultsButtonGroup>
                {
                    this.state.page === 'table' &&
                    <ResultSoccerTable league={this.props.league}/>
                }
            </ResultsLayout>
        );
    }
}

export default Results;

const ResultsLayout = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ResultTitle = styled.div`
  font-size: 1.8em;
  font-weight: ${theme.font.bold};
  font-style: italic;
  margin-bottom: 10px;
`

const ResultsButtonGroup = styled.div`
  width: 60%;
  text-align: center;
  margin-bottom: 30px;

  button {
    border-radius: 0;
    margin: 0;
    width: 50%;
  }
  
  button:not(:last-child) {
    border-right: none;
  }
  
  button:first-child {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  
  button:last-child {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
`
