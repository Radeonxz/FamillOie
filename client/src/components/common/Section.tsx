import { useState, useEffect } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Section = ({ boardId, data }: any) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignments: "center",
          justifyContent: "space-between"
        }}
      >
        <Button>Add a section</Button>
        <Typography variant="body2" fontWeight="700">
          {newData.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px" }} />
    </>
  );
};

export default Section;
