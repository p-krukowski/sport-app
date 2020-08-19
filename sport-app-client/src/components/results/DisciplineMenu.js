import React, {Component} from "react";
import styled from "styled-components";

import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

class DisciplineMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTitles: false
        }
    }

    handleHover = (b) => {
        this.setState({
            showTitles: b
        })
    }

    render() {
        return (
            <DisciplineMenuLayout onMouseEnter={() => this.handleHover(true)}
                                  onMouseLeave={() => this.handleHover(false)}>
                {
                    this.props.disciplines.map((discipline, index) => (
                        <Discipline as={Discipline}
                                    key={index}
                                    onClick={() => {
                                        this.handleHover(false);
                                        this.props.fetchLeaguesByDiscipline(discipline);
                                    }}>
                            <SportsSoccerIcon style={{fontSize: "inherit"}}/>
                            {
                                this.state.showTitles &&
                                <Title>{discipline}</Title>
                            }
                        </Discipline>
                    ))

                }

                {/*<Discipline as={Discipline}*/}
                {/*        name="soccer"*/}
                {/*        onClick={e => this.openLeagueCountryMenu(e.target)}>*/}
                {/*    <SportsBasketballIcon style={{fontSize: "inherit"}}/>*/}
                {/*    {*/}
                {/*        this.state.showTitles &&*/}
                {/*        <Title>Koszykówka</Title>*/}
                {/*    }*/}
                {/*</Discipline>*/}
                {/*<Discipline>*/}
                {/*    <SportsVolleyball style={{fontSize: "inherit"}}/>*/}
                {/*    {*/}
                {/*        this.state.showTitles &&*/}
                {/*        <Title>Siatkówka</Title>*/}
                {/*    }*/}
                {/*</Discipline>*/}
                {/*<Discipline>*/}
                {/*    <SportsMma style={{fontSize: "inherit"}}/>*/}
                {/*    {*/}
                {/*        this.state.showTitles &&*/}
                {/*        <Title>Sztuki walki</Title>*/}
                {/*    }*/}
                {/*</Discipline>*/}
                {/*<Discipline>*/}
                {/*    <SportsFootball style={{fontSize: "inherit"}}/>*/}
                {/*    {*/}
                {/*        this.state.showTitles &&*/}
                {/*        <Title>Futbol</Title>*/}
                {/*    }*/}
                {/*</Discipline>*/}
                {/*<Discipline>*/}
                {/*    <SportsEsports style={{fontSize: "inherit"}}/>*/}
                {/*    {*/}
                {/*        this.state.showTitles &&*/}
                {/*        <Title>E-Sport</Title>*/}
                {/*    }*/}
                {/*</Discipline>*/}
            </DisciplineMenuLayout>
        );
    }
}

export default DisciplineMenu;

const DisciplineMenuLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: auto;
  background: #292929;
`

const Discipline = styled.button`
  font-size: 1.8em;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
  background: none;
  border: none;
  color: inherit;
  
  :hover {
    background: #393939;
  }
  
  :focus {
    background: #393939;
    outline: none;
  }
`

const Title = styled.div`
  margin-left: 10px;
  font-size: 0.5em;
`
