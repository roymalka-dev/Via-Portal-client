import FolderTree from "@/components/common/explorer/FolderTree";
import useFetch from "@/hooks/useFetch";
import { IFile, Ifolder } from "@/types/components.types/explorer.types";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const convertToFolderTree = (
  items: Array<Ifolder | IFile>
): Array<Ifolder | IFile> => {
  return items?.map((item) => {
    if (item.type === "folder") {
      return {
        ...item,
        children: convertToFolderTree(item.subfolders || []),
      };
    }
    return item;
  });
};

const ChecklistRepositoryPage = () => {
  const [urlParams] = useSearchParams();
  const pathFromUrl = urlParams.get("path") || "/checklist";

  const { data, status, error, refetch } = useFetch(
    `/explorer/get-directory-by-path?path=${pathFromUrl}`,
    "get"
  );

  const [currentItems, setCurrentItems] = useState<Array<Ifolder | IFile>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" && data) {
      setCurrentItems(convertToFolderTree([...data.subfolders, ...data.files]));
    }
  }, [data, urlParams, status]);

  const handleFolderClick = (folder: Ifolder) => {
    const newPath = `${pathFromUrl}/${folder.name}`;
    navigate(`?path=${newPath}`);
  };

  const handleOnFileClick = (file: IFile) => {
    navigate(`/checklist/execution/${file.data}`);
  };

  return (
    <Box>
      <FolderTree
        root={"/checklist/repository"}
        rootId={data?._id}
        items={currentItems}
        onFolderClick={handleFolderClick}
        onFileClick={handleOnFileClick}
        loading={status === "loading"}
        error={error}
        currentDirectoryId={data?._id || ""}
        refetch={refetch}
      />
    </Box>
  );
};

export default ChecklistRepositoryPage;
