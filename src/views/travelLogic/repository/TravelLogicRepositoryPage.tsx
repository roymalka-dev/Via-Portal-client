import FolderTree from "@/components/common/explorer/FolderTree";
import { IFile, Ifolder } from "@/types/components.types/explorer.types";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const dummyFolderData: Array<Ifolder | IFile> = [
  {
    id: "CSI",
    name: "CSI",
    type: "folder",
    authority: "admin",
    children: [
      {
        id: "file1",
        name: "File 1",
        path: "/CSI/file1",
        type: "file",
        content: "Content of File 1",
        authority: "admin",
      },
      {
        id: "file2",
        name: "File 2",
        path: "/CSI/file2",
        type: "file",
        content: "Content of File 2",
        authority: "admin",
      },
      {
        id: "folder1",
        name: "Folder 1",
        type: "folder",
        authority: "admin",
        children: [
          {
            id: "file3",
            name: "File 3",
            path: "/CSI/folder1/file3",
            type: "file",
            content: "Content of File 3",
            authority: "admin",
          },
          {
            id: "subfolder1",
            name: "Subfolder 1",
            type: "folder",
            authority: "admin",
            children: [
              {
                id: "file4",
                name: "File 4",
                path: "/CSI/folder1/subfolder1/file4",
                type: "file",
                content: "Content of File 4",
                authority: "admin",
              },
              {
                id: "file5",
                name: "File 5",
                path: "/CSI/folder1/subfolder1/file5",
                type: "file",
                content: "Content of File 5",
                authority: "admin",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "CTI",
    name: "CTI",
    type: "folder",
    authority: "user",
    children: [
      {
        id: "file6",
        name: "File 6",
        path: "/CTI/file6",
        type: "file",
        content: "Content of File 6",
        authority: "user",
      },
      {
        id: "folder2",
        name: "Folder 2",
        type: "folder",
        authority: "user",
        children: [
          {
            id: "file7",
            name: "File 7",
            path: "/CTI/folder2/file7",
            type: "file",
            content: "Content of File 7",
            authority: "user",
          },
          {
            id: "subfolder2",
            name: "Subfolder 2",
            type: "folder",
            authority: "user",
            children: [
              {
                id: "file8",
                name: "File 8",
                path: "/CTI/folder2/subfolder2/file8",
                type: "file",
                content: "Content of File 8",
                authority: "user",
              },
              {
                id: "file9",
                name: "File 9",
                path: "/CTI/folder2/subfolder2/file9",
                type: "file",
                content: "Content of File 9",
                authority: "user",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "file10",
    name: "File 10",
    path: "/file10",
    type: "file",
    content: "Content of File 10",
    authority: "guest",
  },
  {
    id: "Shared",
    name: "Shared",
    type: "folder",
    authority: "guest",
    children: [
      {
        id: "file11",
        name: "File 11",
        path: "/Shared/file11",
        type: "file",
        content: "Content of File 11",
        authority: "guest",
      },
      {
        id: "folder3",
        name: "Folder 3",
        type: "folder",
        authority: "guest",
        children: [
          {
            id: "file12",
            name: "File 12",
            path: "/Shared/folder3/file12",
            type: "file",
            content: "Content of File 12",
            authority: "guest",
          },
          {
            id: "subfolder3",
            name: "Subfolder 3",
            type: "folder",
            authority: "guest",
            children: [
              {
                id: "file13",
                name: "File 13",
                path: "/Shared/folder3/subfolder3/file13",
                type: "file",
                content: "Content of File 13",
                authority: "guest",
              },
              {
                id: "file14",
                name: "File 14",
                path: "/Shared/folder3/subfolder3/file14",
                type: "file",
                content: "Content of File 14",
                authority: "guest",
              },
            ],
          },
        ],
      },
    ],
  },
];
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
        items = found.children;
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
      />
    </Box>
  );
};

export default TravelLogicRepositoryPage;
