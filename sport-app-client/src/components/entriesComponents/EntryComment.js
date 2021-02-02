import React, {useState} from "react";
import {theme} from "../../util/theme";
import {dateTimeToWords} from "../../util/timeFormat";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {addPointToComment} from "../../util/apiUtils/CommentUtils";
import {formatText} from "../../util/textFormat";
import {
  Dialog,
  Divider,
  Grow,
  IconButton,
  Link,
  Paper
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const EntryComment = props => {

  const [comment, setComment] = useState(props.comment);
  const [imageModal, setImageModal] = useState(false);
  const [scoreColor, setScoreColor] = useState("inherit");

  const handleUpvoteButton = () => {
    addPointToComment(comment.id)
    .then(response => {
      changeScoreColor(response);
      setComment({
        ...comment,
        score: response
      });
    })
    .catch(error => {
      alert("Błąd serwera");
    });
  };

  const changeScoreColor = (fetchedScore) => {
    if (fetchedScore >= comment.score) {
      setScoreColor(theme.colors.primary);
    } else {
      setScoreColor("inherit")
    }
  }

  const commentTime = dateTimeToWords(comment.createdAt);

  return (
      <>
        <Paper component={Box} display={"flex"} flexDirection={"column"}
               fontSize={"0.9em"} bgcolor={theme.colors.background}>
          <Box display={"flex"} justifyContent={"space-between"}
               alignItems={"center"}>
            <Box m={1} display={"flex"}>
              <Box fontWeight={"bold"}>
                {comment.author.username}
              </Box>
              <Box ml={1} color={theme.colors.lightgray}>
                {commentTime}
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Box color={scoreColor} fontWeight={"bold"}>
                {comment.score}
              </Box>
              {
                props.isAuthenticated &&
                <IconButton size={"small"} onClick={() => handleUpvoteButton()}>
                  <ArrowDropUpIcon/>
                </IconButton>
              }
            </Box>
          </Box>
          <Divider/>
          <Box p={1}>
            <Box mb={1} dangerouslySetInnerHTML={formatText(comment.content)}/>
            {
              comment.imageUrl !== null &&
              <Box fontSize={"0.8rem"}>
                <Box mb={1} overflow={"hidden"} width={{xs: "100%", lg: "50%"}}
                     maxHeight={"300px"}
                     onClick={() => setImageModal(true)}>
                  <img src={comment.imageUrl}
                       style={{maxWidth: "100%", cursor: "zoom-in"}}/>
                </Box>
                <Link href={comment.imageUrl} target="_blank">
                  Źródło
                </Link>
              </Box>
            }
          </Box>
        </Paper>

        {
          imageModal &&
          <Dialog open={imageModal} onClose={() => setImageModal(false)}
                  TransitionComponent={Grow}
                  PaperComponent={Box}>
            <img src={comment.imageUrl} style={{maxWidth: "100%", maxHeight: "100%"}}/>
          </Dialog>
        }
      </>
  );
};

export default EntryComment;
