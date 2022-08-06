import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  IconButton,
  Button,
  TextField,
  Typography,
  Divider
} from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import boardApi from "../apis/boardApi";
import { setBoards } from "../redux/features/boardSlice";
import EmojiPicker from "../components/common/EmojiPicker";

const Board = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const boards = useSelector((state: any) => state.board.value);

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

  const onIconChange = async (newIcon: string) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setBoards(temp));
    try {
      await boardApi.update(boardId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

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
        <IconButton>
          {isFavorite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box>
        <Box sx={{ padding: "10px 50px" }}>
          <Box>
            <EmojiPicker icon={icon} onChange={onIconChange} />
            <TextField
              value={title}
              placeholder="Untitled"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2rem",
                  fontWeight: "700"
                }
              }}
            />
            <TextField
              value={description}
              placeholder="Add a description"
              variant="outlined"
              multiline
              fullWidth
              sx={{
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                "& .MuiOutlinedInput-root": {
                  fontSize: "0.8rem"
                }
              }}
            />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignments: "center",
              justifyContent: "space-between"
            }}
          >
            <Button>Add a section</Button>
            <Typography variant="body2" fontWeight="700">
              {sections.length} Sections
            </Typography>
          </Box>
          <Divider sx={{ margin: "10px" }} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
