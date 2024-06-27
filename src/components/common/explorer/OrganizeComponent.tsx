/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApiService from "@/services/ApiService";
import useFetch from "@/hooks/useFetch";
import { Ifolder } from "@/types/components.types/explorer.types";

const OrganizeComponent = ({
  rootId,
  folderId,
}: {
  folderId: any;
  rootId: string;
}) => {
  const [folders, setFolders] = useState<Ifolder[]>([]);
  const disable = true;
  const { data, status, error, refetch } = useFetch<Ifolder[]>(
    `/explorer/get-directories/${rootId}`
  );

  useEffect(() => {
    if (status === "success" && data) {
      setFolders(data);
    }
  }, [data, status]);

  const handleMove = async (newParentId: string) => {
    try {
      await ApiService.put(`/explorer/move-folder`, {
        newParentId,
        folderId,
      });
      refetch();
    } catch (error: any) {
      console.error(error);
    }
  };

  const renderFolders = (folder: Ifolder) => {
    return (
      <Accordion key={folder._id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{folder.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            <Button
              variant="outlined"
              onClick={() => handleMove(folder.parentFolder || "")}
            >
              Move Here
            </Button>
            {folder?.subfolders?.map((subfolder: any) =>
              renderFolders(subfolder)
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };
  if (disable) return <Box>Organize is currently disabled</Box>;
  if (status === "loading") return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return <Box>{folders.map((folder) => renderFolders(folder))}</Box>;
};

export default OrganizeComponent;
