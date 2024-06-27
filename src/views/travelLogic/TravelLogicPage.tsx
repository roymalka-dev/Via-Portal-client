import LinkGrid from "@/components/ui/grid/LinkGrid";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const items = [
  {
    name: "Repository",
    icon: <GitHubIcon />,
    link: "repository",
  },
  {
    name: "Create",
    icon: <AddCircleIcon />,
    link: "create",
  },
];

const TravelLogicPage = () => {
  return (
    <Box>
      <LinkGrid items={items} linkType="inner" />
    </Box>
  );
};

export default TravelLogicPage;
