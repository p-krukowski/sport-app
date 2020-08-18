import React, {Component} from "react";
import styled from "styled-components";

import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import {SportsEsports, SportsFootball, SportsMma, SportsVolleyball} from "@material-ui/icons";

class DisciplineMenu extends Component {

    handleHover = (b) => {
        this.setState({
            showTitles: b
        })
    }

    render() {
        return (
            <DisciplineMenuLayout onMouseEnter={() => this.handleHover(true)}
                                  onMouseLeave={() => this.handleHover(false)}>
                <Discipline>
                    <SportsSoccerIcon style={{fontSize: "inherit"}}/>
                    <Title>Piłka nożna</Title>
                </Discipline>
                <Discipline>
                    <SportsBasketballIcon style={{fontSize: "inherit"}}/>
                    <Title>Koszykówka</Title>
                </Discipline>
                <Discipline>
                    <SportsVolleyball style={{fontSize: "inherit"}}/>
                    <Title>Siatkówka</Title>
                </Discipline>
                <Discipline>
                    <SportsMma style={{fontSize: "inherit"}}/>
                    <Title>Sztuki walki</Title>
                </Discipline>
                <Discipline>
                    <SportsFootball style={{fontSize: "inherit"}}/>
                    <Title>Futbol</Title>
                </Discipline>
                <Discipline>
                    <SportsEsports style={{fontSize: "inherit"}}/>
                    <Title>E-Sport</Title>
                </Discipline>
            </DisciplineMenuLayout>
        );
    }
}

export default DisciplineMenu;

const DisciplineMenuLayout = styled.div`
  font-size: 2em !important;
  display: flex;
  flex-direction: column;
  margin: -10px;
  padding: 10px;
  width: auto;
  background: #292929;
`

const Discipline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const Titles = styled.div`
  font-size: 0.3em;
`

const Title = styled.div`
  margin-left: 10px;
  font-size: 0.5em;
`
