import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { generateColorFromName, generateInitials } from "@/utils/avatar.utils";

interface AvatarDropdownProps {
  assignee: string;
  assigneeOptions: string[];
  onAssigneeChange: (newAssignee: string) => Promise<void>;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  assignee,
  assigneeOptions,
  onAssigneeChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAssigneeChange = async (newAssignee: string) => {
    setLoading(true);
    handleClose();
    await onAssigneeChange(newAssignee);
    setLoading(false);
  };

  const avatarColor =
    assignee === "Unassigned" ? "gray" : generateColorFromName(assignee);

  return (
    <>
      <IconButton onClick={handleClick}>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Avatar
            sx={{
              width: 24,
              height: 24,
              cursor: "pointer",
              backgroundColor: avatarColor,
              opacity: 0.5,
            }}
          >
            {generateInitials(assignee)}
          </Avatar>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {assigneeOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleAssigneeChange(option)}>
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor:
                    option === "Unassigned"
                      ? "gray"
                      : generateColorFromName(option),
                  opacity: 0.5,
                }}
              >
                {generateInitials(option)}
              </Avatar>
            </ListItemIcon>
            <ListItemText>{option}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AvatarDropdown;
