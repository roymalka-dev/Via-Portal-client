/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  styled,
} from "@mui/material";
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FolderOpen as OrganizeIcon, // Assuming FolderOpen as an example for organize
} from "@mui/icons-material";
import { Ifolder, IFile } from "@/types/components.types/explorer.types";

interface IFolderGridProps {
  items: Array<Ifolder | IFile>;
  onFolderClick: (folder: Ifolder) => void;
  onFileClick: (file: IFile) => void;
  onEdit: (item: Ifolder | IFile) => void;
  onDelete: (item: Ifolder | IFile) => void;
  onOrganize: (item: Ifolder | IFile) => void; // New handler for the organize action
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "none",
  position: "relative",
  "&:hover .actions": {
    display: "flex",
  },
  "&:hover .icon": {
    transform: "translateX(-5px)",
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  textAlign: "center",
}));

const ActionIcons = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: "none",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const FolderGrid: React.FC<IFolderGridProps> = ({
  items,
  onFolderClick,
  onFileClick,
  onEdit,
  onDelete,
  onOrganize,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {items?.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={item.name + index}>
            <StyledCard
              onDoubleClick={() =>
                item.type === "folder" ? onFolderClick(item) : onFileClick(item)
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "transform 0.2s",
                }}
              >
                <CardMedia
                  className="icon"
                  sx={{ transition: "transform 0.2s" }}
                >
                  {item.type === "folder" ? (
                    <FolderIcon sx={{ fontSize: 80, color: "primary.main" }} />
                  ) : (
                    <FileIcon sx={{ fontSize: 80, color: "action.active" }} />
                  )}
                </CardMedia>
                <ActionIcons className="actions">
                  <IconButton size="small" onClick={() => onEdit(item)}>
                    <EditIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(item)}>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => onOrganize(item)}>
                    <OrganizeIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </ActionIcons>
              </Box>
              <StyledCardContent>
                <Typography variant="body2" noWrap>
                  {item.name}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FolderGrid;
