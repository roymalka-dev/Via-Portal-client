import React, { useState } from "react";
import { Box, Typography, Chip, IconButton, Popover } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TagsDisplay = ({ tags }: { tags: string[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "tags-popover" : undefined;

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" sx={{ ml: 2 }}>
          Tags:
        </Typography>
        <IconButton onClick={handleClick}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            maxWidth: "400px", // Set a max width for the scrollable area
            p: 1,
          }}
        >
          {tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ margin: "0 4px" }} />
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default TagsDisplay;
