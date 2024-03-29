import { SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import authApi from "../apis/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    const data: any = new FormData(e.target);

    let err = false;
    const errMsg = "Please fill this field";

    const username: string = data.get("username").trim();
    if (username === "") {
      err = true;
      setUsernameErrText(errMsg);
    }

    const password: string = data.get("password").trim();
    if (password === "") {
      err = true;
      setPasswordErrText(errMsg);
    }

    if (err) return;

    setIsLoading(true);

    try {
      const res: any = await authApi.login({
        username,
        password
      });
      setIsLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err: any) {
      const errors = err.data.errors;
      errors.forEach((e: { param: string; msg: SetStateAction<string> }) => {
        if (e.param === "username") setUsernameErrText(e.msg);
        if (e.param === "password") setPasswordErrText(e.msg);
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={isLoading}
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={isLoading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
        Don't have an account? Signup here!
      </Button>
    </>
  );
};

export default Login;
