import { ListItem, Box, Typography } from "@mui/material";

const FavoriteList = () => {
  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Favorites
          </Typography>
        </Box>
      </ListItem>
    </>
  );
};

export default FavoriteList;
