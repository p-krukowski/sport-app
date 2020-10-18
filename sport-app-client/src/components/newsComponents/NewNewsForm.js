import React, {Component} from "react";
import styled from "styled-components";
import ExternalNewsForm from "./ExternalNewsForm";
import CustomNewsForm from "./CustomNewsForm";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "../common/Button";

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
            <NewNewsFormLayout>
                <ButtonGroup size="large" aria-label="outlined primary button group">
                    <Button checked={this.state.external}
                            name="external"
                            onChange={(e) => this.setChecked(e.currentTarget.name)}>
                        Z linku
                    </Button>
                    <Button checked={!this.state.external}
                            name="custom"
                            onChange={(e) => this.setChecked(e.currentTarget.name)}>
                        Własny
                    </Button>
                </ButtonGroup>
                {
                    this.state.external &&
                    <ExternalNewsForm updateFields={this.props.updateFields}/>
                }
                {
                    !this.state.external &&
                    <CustomNewsForm updateFields={this.props.updateFields}/>
                }
            </NewNewsFormLayout>
        );
    }
}

export default NewNewsForm;

const NewNewsFormLayout = styled.div`
  display: flex;
  flex-direction: column;
`