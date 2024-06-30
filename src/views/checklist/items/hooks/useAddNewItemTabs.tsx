import { RequestType, TabConfig } from "@/types/components.types/form.types";
import { IchecklistTag } from "@/types/data.types/checklist.types";
import { useMemo } from "react";
import * as yup from "yup";

const useAddNewItemFormTabs = (
  tags: IchecklistTag[] | undefined
): TabConfig<RequestType>[] => {
  const addItemFormTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "information",
        fields: [
          {
            name: "name",
            label: "name",
            type: "text",
            initialValue: "",
            validation: yup.string().required("name is required"),
          },
          {
            name: "description",
            label: "description",
            type: "text",
            initialValue: "",
            validation: yup.string().required("description is required"),
          },

          {
            name: "url",
            label: "url",
            type: "text",
            initialValue: "",
            validation: yup.string().url().required("url is required"),
          },
        ],
      },
      {
        tabName: "tags",
        fields: [
          {
            name: "tags",
            label: "tag",
            type: "multi-select",
            options: tags?.map((t) => t.name) || [],
            initialValue: [],
            validation: yup.array().min(0).of(yup.string().required()),
          },
        ],
      },
    ];
  }, [tags]);

  return addItemFormTabs;
};

export default useAddNewItemFormTabs;
