import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import Loading from "../common/Loading";
import Sidebar from "../common/Sidebar";
import authUtils from "../../utils/authUtils";

const AppLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

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
