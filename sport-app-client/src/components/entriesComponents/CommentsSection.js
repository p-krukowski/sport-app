import React, {Component} from 'react';
import NewComment from "./NewComment";
import AllComments from "./AllComments";
import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const showCommentsText = "Pokaż komentarze";
const hideCommentsText = "Ukryj komentarze";

class CommentsSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            buttonText: showCommentsText,
            entryToUpdate: null
        }
    }

    handleShowComments = () => {
        if(!this.state.showComments) {
            this.showComments();
        }
        else {
            this.hideComments();
        }
    };

    showComments = () => {
        this.setState({
            showComments: true,
            buttonText: hideCommentsText
        });
    };

    hideComments = () => {
        this.setState({
            showComments: false,
            buttonText: showCommentsText
        });
    };

    updateComments = (entryId) => {
        this.setState({
            entryToUpdate: entryId
        })
    };

    render() {
        return (
            <React.Fragment>
                <NewComment isAuthenticated={this.props.isAuthenticated} entryId={this.props.entryId} showComments={this.showComments} updateComments={this.updateComments}/>
                <Row>
                    <Button onClick={this.handleShowComments} variant={"primary"}
                            style={{width: '100%', marginBottom: '10px', padding: '2px'}}>
                        {this.state.buttonText}
                    </Button>
                </Row>
                {
                    this.state.showComments &&
                    <AllComments entryId={this.props.entryId} entryToUpdate={this.state.entryToUpdate}/>
                }
            </React.Fragment>
        );
    }
}

export default CommentsSection;