import React, {Component} from "react";
import styled from "styled-components";
import {Card, CardBody, CardHeader} from "../common/CardC";
import Button from "../common/Button";
import SportDataCard from "./SportDataCard";
import {theme} from "../../util/theme";

class SportPanel extends Component {
  render() {
    return (
        <SportPanelLayout>
          <Card style={{justifyContent: 'flex-start', marginBottom: 0}}>
            <CardHeader>
              <div>Moje ligi</div>
              <Button>
                Zmień
              </Button>
            </CardHeader>
            <CardBody style={{alignItems: 'center', padding: '5px'}}>
              <Select>
                <option>Premier League</option>
                <option>Bundesliga</option>
                <option>Ekstraklasa</option>
              </Select>
              <SportDataCard {...this.props}/>
            </CardBody>
          </Card>
        </SportPanelLayout>
    );
  }
}

export default SportPanel;

const SportPanelLayout = styled.div`
  display: flex;
  position: relative;
`

const Select = styled.select`
  color: ${theme.colors.primary};
  background: ${theme.colors.background};
  outline: none;
  border: solid 1px ${theme.colors.primary};
  border-radius: 5px;
  padding: 5px 20px;
  font: inherit;
  appearance: none;
  cursor: pointer;
  margin-bottom: 10px;
`