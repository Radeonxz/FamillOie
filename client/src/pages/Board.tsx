import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import StartBorderOutlinedIcon from "@mui/icons-material/StartBorderOutlined";

import boardApi from "../apis/boardApi";

const Board = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res: any = await boardApi.getBoardById(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavorite(res.isFavorite);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getBoard();
  }, [boardId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignments: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <IconButton variant="outlined">
          {isFavorite ? (
            <StartOutlinedIcon color="warning" />
          ) : (
            <StartBorderOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </>
  );
};

export default Board;
