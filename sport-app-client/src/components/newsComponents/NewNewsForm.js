import React, {Component} from "react";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import ExternalNewsForm from "./ExternalNewsForm";
import CustomNewsForm from "./CustomNewsForm";

class NewNewsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            external: true
        }
    }

    setChecked(name) {
        if (name === "external") {
            this.setState({
                external: true
            })
        } else {
            this.setState({
                external: false
            })
        }
    }

    render() {
        return (
            <>
                <ButtonGroup toggle className="mb-2">
                    <ToggleButton
                        type="checkbox"
                        variant="primary"
                        checked={this.state.external}
                        name="external"
                        onChange={(e) => this.setChecked(e.currentTarget.name)}
                    >
                        Z linku
                    </ToggleButton>
                    <ToggleButton
                        type="checkbox"
                        variant="primary"
                        checked={!this.state.external}
                        name="custom"
                        onChange={(e) => this.setChecked(e.currentTarget.name)}
                    >
                        Własny
                    </ToggleButton>
                </ButtonGroup>
                {
                    this.state.external &&
                    <ExternalNewsForm updateFields={this.props.updateFields}/>
                }
                {
                    !this.state.external &&
                    <CustomNewsForm updateFields={this.props.updateFields}/>
                }
            </>
        );
    }
}

export default NewNewsForm;