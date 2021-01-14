import React from 'react';
import {dateTimeToWords} from "../../util/timeFormat";
import {formatText} from "../../util/textFormat";
import {Divider, Link, Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const EntryPanel = props => {
  const entry = props.entry;

  return (
      <Paper>
        <Box px={1} display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"}>
            <Box fontWeight={"bold"}>
              {entry.author.username}
            </Box>
            <Box ml={2}>
              {dateTimeToWords(entry.createdAt)}
            </Box>
          </Box>
          <Box>
            {entry.score}
          </Box>
        </Box>
        <Divider/>
        <Box display={"flex"} flexDirection={"column"} m={1}>
          <div dangerouslySetInnerHTML={formatText(entry.content)}/>
          {
            entry.imageUrl !== null &&
            <Box mt={"10px"}>
              <Box width={{xs: 1, md: 1 / 2}} maxHeight={"500px"}
                   overflow={"auto"}>
                <img style={{maxWidth: "100%"}} src={entry.imageUrl}
                     alt={"Brak obrazka"}/>
              </Box>
              <Link href={entry.imageUrl} target="_blank">
                Źródło
              </Link>
            </Box>
          }
        </Box>
      </Paper>
  );
}

export default EntryPanel;
