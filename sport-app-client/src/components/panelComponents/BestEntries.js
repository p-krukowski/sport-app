import React, {Component} from "react";
import EntryPanel from "./EntryPanel";
import styled from "styled-components";

class BestEntries extends Component {

    render() {
        return (
            <BestEntriesLayout>
                {
                    this.props.entries.map((entry) => (
                        <EntryPanel key={entry.id} isAuthenticated={false} entry={entry}/>
                    ))
                }
            </BestEntriesLayout>
        );
    }
}

export default BestEntries;

const BestEntriesLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  padding-right: 5px;
  
  @media only screen and (min-width: 768px) {
    overflow: auto;
  }
`