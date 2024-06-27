import FolderTree from "@/components/common/explorer/FolderTree";
import { IFile, Ifolder } from "@/types/components.types/explorer.types";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const dummyFolderData: Array<Ifolder | IFile> = [];
const TravelLogicRepositoryPage = () => {
  const [currentItems, setCurrentItems] =
    useState<Array<Ifolder | IFile>>(dummyFolderData);
  const query = useQuery();
  const navigate = useNavigate();
  const path = query.get("p") || "";
  const paths = path.split("/").filter(Boolean);

  useEffect(() => {
    let items: Array<Ifolder | IFile> = dummyFolderData;

    paths.forEach((segment: string) => {
      const found = items.find(
        (item) => item.name === segment && item.type === "folder"
      ) as Ifolder;
      if (found && found.type === "folder") {
        items = found.subfolders;
      }
    });

    setCurrentItems(items);
  }, [path, paths]);

  const handleFolderClick = (folder: Ifolder) => {
    const newPath = `${path}/${folder.name}`;
    navigate(`?p=${newPath}`);
  };

  const handleOnFileClick = (file: IFile) => {
    console.log(file);
  };

  return (
    <Box>
      <FolderTree
        root={"/travel-logic/repository"}
        items={currentItems}
        onFolderClick={handleFolderClick}
        onFileClick={handleOnFileClick}
        rootId={""}
        currentDirectoryId={""}
        refetch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
};

export default TravelLogicRepositoryPage;
