import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = ({ icon, onChange }: any) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const selectEmoji = (e: any) => {
    const sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    onChange(emoji);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "9999"
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
