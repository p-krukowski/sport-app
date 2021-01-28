import React, {useState} from 'react';
import NewComment from "./NewComment";
import AllComments from "./AllComments";
import {fetchComments} from "../../util/apiUtils/CommentUtils";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
const showCommentsText = "Pokaż komentarze";
const hideCommentsText = "Ukryj komentarze";

const CommentsSection = props => {

  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);
  const [buttonText, setButtonText] = useState(showCommentsText);
  const [commentsAmount, setCommentsAmount] = useState(props.commentsAmount);
  const [newComment, setNewComment] = useState(false);
  const [alert, setAlert] = useState(false);

  const hideComments = () => {
    setShowComments(false);
    setButtonText(showCommentsText);
  };

  const getComments = () => {
    fetchComments(props.entryId)
    .then(response => {
      setComments(response);
      setCommentsAmount(response.length);
      setShowComments(true);
      setButtonText(hideCommentsText);
    })
    .catch(error => {
      setAlert(true);
    })
  };

  const handleComment = () => {
    getComments();
    setNewComment(!newComment);
  }

  return (
      <>
        <Box width={1} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} fontSize={"0.9rem"}>
            <Button variant={"text"}
                    onClick={showComments ? hideComments : getComments}>
              {buttonText} ({commentsAmount})
            </Button>
            {
              props.isAuthenticated &&
              <Button variant={"text"} onClick={handleComment}>
                Skomentuj
              </Button>
            }
          </Box>
          <NewComment entryId={props.entryId}
                      updateComments={getComments}
                      show={newComment}/>
          {
            showComments &&
            <AllComments comments={comments}
                         isAuthenticated={props.isAuthenticated}/>
          }
        </Box>

        <Snackbar open={alert} autoHideDuration={6000}
                  onClose={() => setAlert(false)}>
          <Alert onClose={() => setAlert(false)} severity={"error"}>
            Nie udało się załadować komentarzy
          </Alert>
        </Snackbar>
      </>
  );
}

export default CommentsSection;
