import React, {useState} from 'react';

import CommentsSection from "./CommentsSection";
import {addPointToEntry} from "../../util/apiUtils/EntriesUtils";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {dateTimeToWords} from "../../util/timeFormat";
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
import {theme} from "../../util/theme";

const Entry = props => {

  const [entry, setEntry] = useState(props.entry);
  const [imageModal, setImageModal] = useState(false);
  const [scoreColor, setScoreColor] = useState("inherit");

  const handleUpvoteButton = () => {
    addPointToEntry(entry.id)
    .then(response => {
      changeScoreColor(response);
      setEntry({
        ...entry,
        score: response
      });
    })
    .catch(error => {
      alert("Błąd serwera");
    });
  };

  const changeScoreColor = (fetchedScore) => {
    if (fetchedScore >= entry.score) {
      setScoreColor(theme.colors.primary);
    } else {
      setScoreColor("inherit")
    }
  }

  const entryTime = dateTimeToWords(entry.createdAt);

  return (
      <>
        <Paper component={Box} display={"flex"} flexDirection={"column"}
               fontSize={"0.9em"}>
          <Box display={"flex"} justifyContent={"space-between"}
               alignItems={"center"}>
            <Box m={1} display={"flex"}>
              <Box fontWeight={"bold"}>
                {entry.author.username}
              </Box>
              <Box ml={1} color={theme.colors.lightgray}>
                {entryTime}
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Box color={scoreColor} fontWeight={"bold"}>
                {entry.score}
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
            <Box mb={1} dangerouslySetInnerHTML={formatText(entry.content)}/>
            {
              entry.imageUrl !== null &&
              <Box fontSize={"0.8rem"}>
                <Box mb={1} overflow={"hidden"} width={{xs: "100%", lg: "50%"}}
                     maxHeight={"300px"}
                     onClick={() => setImageModal(true)}>
                  <img src={entry.imageUrl}
                       style={{maxWidth: "100%", cursor: "zoom-in"}}/>
                </Box>
                <Link href={entry.imageUrl} target="_blank">
                  Źródło
                </Link>
              </Box>
            }
          </Box>
          <Divider/>
          <Box px={1}>
            <CommentsSection entryId={entry.id}
                             commentsAmount={entry.commentsAmount}
                             isAuthenticated={props.isAuthenticated}/>
          </Box>
        </Paper>

        {
          imageModal &&
          <Dialog open={imageModal} onClose={() => setImageModal(false)}
                  TransitionComponent={Grow}
                  PaperComponent={Box}>
            <img src={entry.imageUrl}/>
          </Dialog>
        }
      </>
  );
}

export default Entry;
