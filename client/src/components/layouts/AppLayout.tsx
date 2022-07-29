import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

import { setUser } from "../../redux/features/userSlice";
import Loading from "../common/Loading";
import Sidebar from "../common/Sidebar";
import authUtils from "../../utils/authUtils";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        dispatch(setUser(user));
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: "flex"
      }}
    >
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
