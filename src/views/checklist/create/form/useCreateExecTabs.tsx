/* eslint-disable @typescript-eslint/no-explicit-any */

import { RequestType, TabConfig } from "@/types/components.types/form.types";
import { IchecklistTag } from "@/types/data.types/checklist.types";
import { useMemo } from "react";
import * as yup from "yup";

const useCreateExecTabs = (
  tags: IchecklistTag[] | undefined
): TabConfig<RequestType>[] => {
  const editItemFormTabs: TabConfig<RequestType>[] = useMemo(() => {
    return [
      {
        tabName: "information",
        fields: [
          {
            name: "name",
            label: "Enter Name",
            type: "text",
            initialValue: "",
            validation: yup.string().required(),
            information: "Enter execution name",
          },
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

  return editItemFormTabs;
};

export default useCreateExecTabs;
