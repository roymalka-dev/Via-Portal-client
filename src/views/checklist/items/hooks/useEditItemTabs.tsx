/* eslint-disable @typescript-eslint/no-explicit-any */

import { RequestType, TabConfig } from "@/types/components.types/form.types";
import { IchecklistTag } from "@/types/data.types/checklist.types";
import { useMemo } from "react";
import * as yup from "yup";

const useEditItemFormTabs = (
  selectedEditApp: any,
  tags: IchecklistTag[] | undefined
): TabConfig<RequestType>[] => {
  const editItemFormTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "information",
        fields: [
          {
            name: "id",
            label: "id",
            type: "text",
            disabled: true,
            initialValue: selectedEditApp?._id || "",
            validation: yup.string().required("name is required"),
          },
          {
            name: "name",
            label: "name",
            type: "text",
            initialValue: selectedEditApp?.name || "",
            validation: yup.string().required("name is required"),
          },
          {
            name: "description",
            label: "description",
            type: "text",
            initialValue: selectedEditApp?.description || "",
            validation: yup.string().required("description is required"),
          },

          {
            name: "url",
            label: "url",
            type: "text",
            initialValue: selectedEditApp?.url || "",
            validation: yup.string().url().required("url is required"),
          },
          {
            name: "tags",
            label: "tag",
            type: "multi-select",
            options: tags?.map((t) => t.name) || [],
            initialValue: selectedEditApp?.tags || [""],
            validation: yup.array().min(0).of(yup.string().required()),
          },
        ],
      },
    ];
  }, [selectedEditApp, tags]);

  return editItemFormTabs;
};

export default useEditItemFormTabs;
