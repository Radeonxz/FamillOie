import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";

import Loading from "../common/Loading";
import authUtils from "../../utils/authUtils";
import assets from "../../assets";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setIsLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return isLoading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <img src={assets.images.logo} style={{ width: "100px" }} alt="logo" />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
