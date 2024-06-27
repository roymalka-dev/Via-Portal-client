import LinkGrid from "@/components/ui/grid/LinkGrid";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const items = [
  {
    name: "Repository",
    icon: <GitHubIcon />,
    link: "repository",
  },
  {
    name: "Items",
    icon: <ListIcon />,
    link: "items",
  },
  {
    name: "Create",
    icon: <AddCircleIcon />,
    link: "create",
  },
];

const ChecklistPage = () => {
  return (
    <Box>
      <LinkGrid items={items} linkType="inner" />
    </Box>
  );
};

export default ChecklistPage;
