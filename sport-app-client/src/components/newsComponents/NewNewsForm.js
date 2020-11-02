import React, {Component} from "react";
import styled from "styled-components";
import ExternalNewsForm from "./ExternalNewsForm";
import CustomNewsForm from "./CustomNewsForm";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

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
                <ButtonGroup size="large" color="primary">
                    <Button variant={this.state.external === true ? "contained" : ""}
                            name="external"
                            onClick={(e) => this.setChecked(e.currentTarget.name)}>
                        Z linku
                    </Button>
                    <Button variant={this.state.external === false ? "contained" : ""}
                            name="custom"
                            onClick={(e) => this.setChecked(e.currentTarget.name)}>
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
  align-items: center;
`