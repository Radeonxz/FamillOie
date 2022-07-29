import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import boardApi from "../apis/boardApi";
import { setBoards } from "../redux/features/boardSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const createBoard = async () => {
    setIsLoading(true);
    try {
      const res: any = boardApi.create();
      dispatch(setBoards([res]));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        loading={isLoading}
        onClick={createBoard}
      >
        Click to create a board
      </LoadingButton>
    </Box>
  );
};

export default Home;
