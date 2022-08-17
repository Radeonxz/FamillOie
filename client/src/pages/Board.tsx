import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import boardApi from "../apis/boardApi";
import { setBoards } from "../redux/features/boardSlice";
import { setFavoriteList } from "../redux/features/favoriteSlice";
import Section from "../components/common/Section";
import EmojiPicker from "../components/common/EmojiPicker";

let timer: any;
const timeout = 5000;
const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const boards = useSelector((state: any) => state.board.value);
  const favoriteList = useSelector((state: any) => state.board.value);

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
        setIsFavorite(res.favorite);
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

    if (isFavorite) {
      let tempFavorite = [...favoriteList];
      const favoriteIndex = tempFavorite.findIndex((e) => e.id === boardId);
      tempFavorite[favoriteIndex] = {
        ...tempFavorite[favoriteIndex],
        icon: newIcon
      };
      dispatch(setFavoriteList(tempFavorite));
    }

    setIcon(newIcon);
    dispatch(setBoards(temp));
    try {
      await boardApi.update(boardId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const updateTitle = async (e: any) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    if (isFavorite) {
      let tempFavorite = [...favoriteList];
      const favoriteIndex = tempFavorite.findIndex((e) => e.id === boardId);
      tempFavorite[favoriteIndex] = {
        ...tempFavorite[favoriteIndex],
        title: newTitle
      };
      dispatch(setFavoriteList(tempFavorite));
    }

    dispatch(setBoards(temp));

    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e: any) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], description: newDescription };
    dispatch(setBoards(temp));

    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateFavorite = async () => {
    try {
      const board = await boardApi.update(boardId, { favorite: !isFavorite });
      let newFavoriteList = [...favoriteList];
      if (isFavorite) {
        newFavoriteList = newFavoriteList.filter((e: any) => e.id !== boardId);
      } else {
        newFavoriteList.unshift(board);
      }
      dispatch(setFavoriteList(newFavoriteList));
      setIsFavorite(!isFavorite);
    } catch (err) {
      alert(err);
    }
  };

  const deleteBoard = async () => {
    try {
      await boardApi.deleteBoardById(boardId);
      if (isFavorite) {
        const newFavoriteList = favoriteList.filter(
          (e: any) => e.id !== boardId
        );
        dispatch(setFavoriteList(newFavoriteList));
      }

      const newList = boards.filter((e: any) => e.id !== boardId);
      if (newList.length === 0) {
        navigate("/boards");
      } else {
        navigate(`/boards/${newList[0].id}`);
      }
      dispatch(setBoards(newList));
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
        <IconButton onClick={updateFavorite}>
          {isFavorite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton color="error" onClick={deleteBoard}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box>
        <Box sx={{ padding: "10px 50px" }}>
          <Box>
            <EmojiPicker icon={icon} onChange={onIconChange} />
            <TextField
              value={title}
              onChange={updateTitle}
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
              onChange={updateDescription}
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
          <Section data={sections} boardId={boardId} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
