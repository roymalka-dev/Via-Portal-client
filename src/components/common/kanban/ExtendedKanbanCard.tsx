/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  Typography,
  CardActions,
  Grid,
  IconButton,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import useModal from "@/hooks/useModal";
import { CustomModal } from "../modal/CustomModal";

interface ExtendedKanbanCardProps {
  name: string;
  _id: string;
  description: string;
  tags?: string[];
  url?: string;
  handleDelete: (id: string) => void;
  handleEdit: (item: any) => void;
  refetch: () => void;
}

export const ExtendedKanbanCard: React.FC<ExtendedKanbanCardProps> = (
  props
) => {
  const {
    name,
    _id,
    description,
    tags = [],
    url,
    handleEdit,
    handleDelete,
    refetch,
  } = props;
  const [open, setOpen] = useState(false);
  const [showFullId, setShowFullId] = useState(false);
  const modal = useModal();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditItem = () => {
    handleEdit({
      name,
      _id,
      description,
      tags,
      url,
    });
  };
  const handleDeleteItem = () => {
    handleDelete(_id);
    modal.closeModal();
    refetch();
  };

  const confirmDelete = () => {
    modal.setContent(
      <Box>
        <Typography>Are you sure you want to delete this item?</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={modal.closeModal}
          >
            No
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            color="error"
            onClick={handleDeleteItem}
          >
            Yes
          </Button>
        </Box>
      </Box>
    );
    modal.openModal();
  };

  const MAX_DESCRIPTION_LENGTH = 50;

  const truncatedDescription =
    description?.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;
  const truncatedTags =
    tags.join(", ").length > MAX_DESCRIPTION_LENGTH
      ? `${tags.join(", ").slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : tags.join(", ");
  const displayedId = showFullId ? _id : `${_id.slice(0, 8)}`;

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginBottom: "16px",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h4" component="div">
              {name}
            </Typography>
            <Tooltip title="Click to show full ID" placement="bottom-start">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ cursor: "pointer" }}
                onClick={() => setShowFullId(!showFullId)}
              >
                {displayedId}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs>
            <Tooltip
              title="Click to show full description and tags"
              placement="bottom-start"
            >
              <Typography
                variant="h4"
                component="div"
                onClick={handleOpen}
                sx={{ cursor: "pointer", wordBreak: "break-word" }}
              >
                {truncatedDescription}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              component="div"
              onClick={handleOpen}
              sx={{ cursor: "pointer", wordBreak: "break-word" }}
            >
              {truncatedTags}
            </Typography>
          </Grid>
          <Grid item>
            <CardActions>
              {url && (
                <IconButton onClick={() => window.open(url, "_blank")}>
                  <LinkIcon />
                </IconButton>
              )}

              <IconButton onClick={handleEditItem}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={confirmDelete}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <CustomModal open={open} title={name} handleClose={handleClose}>
        <Typography
          id="modal-description"
          sx={{ mt: 2, wordBreak: "break-word" }}
        >
          {description}
        </Typography>
        <Typography id="modal-tags" sx={{ mt: 2, wordBreak: "break-word" }}>
          tags: {tags.join(", ")}
        </Typography>
      </CustomModal>
      <CustomModal
        open={modal.isOpen}
        title={name}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </>
  );
};

export default ExtendedKanbanCard;
