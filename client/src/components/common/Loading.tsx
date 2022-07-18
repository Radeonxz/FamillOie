import { Box, CircularProgress } from "@mui/material";

interface LoadingProps {
  fullHeight: boolean;
}

const Loading = ({ fullHeight }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: fullHeight ? "100vh" : "100%"
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
