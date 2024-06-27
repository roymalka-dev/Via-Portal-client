import { RequestType, TabConfig } from "@/types/components.types/form.types";
import { useMemo } from "react";
import * as yup from "yup";

const useAddNewFolderTabs = (
  currentDirectoryId: string
): TabConfig<RequestType>[] => {
  const AddNewFolderTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "information",
        fields: [
          {
            name: "parentFolderId",
            label: "Parent Folder Id",
            type: "text",
            initialValue: currentDirectoryId,
            validation: yup.string().required("name is required"),
            disabled: true,
          },
          {
            name: "name",
            label: "name",
            type: "text",
            initialValue: "",
            validation: yup.string().required("name is required"),
          },
        ],
      },
    ];
  }, [currentDirectoryId]);

  return AddNewFolderTabs;
};

export default useAddNewFolderTabs;
