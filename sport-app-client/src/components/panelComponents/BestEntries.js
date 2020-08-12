import React, {Component} from "react";
import EntryPanel from "./EntryPanel";
import styled from "styled-components";

class BestEntries extends Component {

    render() {
        return (
            <ColCustom style={{paddingTop: '10px'}}>
                {
                    this.props.entries.map((entry) => (
                        <EntryPanel key={entry.id} isAuthenticated={false} entry={entry}/>
                    ))
                }
            </ColCustom>
        );
    }
}

export default BestEntries;

const ColCustom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`