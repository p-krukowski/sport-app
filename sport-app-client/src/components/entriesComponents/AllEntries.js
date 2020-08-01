import React, {Component} from 'react';

import {getAllEntries} from '../../util/apiUtils/EntriesUtils';
import Entry from "./Entry";


export default class AllEntries extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        getAllEntries()
            .then(response => {
                this.setState({
                    entries: response
                });
            });
    }

    render() {

        return (
            <React.Fragment>
                {
                    this.state.entries && this.state.entries.map((entry) => (
                        <Entry key={entry.id} isAuthenticated={this.props.isAuthenticated} entry={entry}/>
                    ))
                }
            </React.Fragment>);
    }
}