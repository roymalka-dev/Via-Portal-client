/* eslint-disable @typescript-eslint/no-explicit-any */

import { RequestType, TabConfig } from "@/types/components.types/form.types";
import { useMemo } from "react";
import * as yup from "yup";

const useEditItemFormTabs = (
  selectedEditItem: any
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
            initialValue: selectedEditItem?._id || "",
            validation: yup.string().required("name is required"),
          },
          {
            name: "name",
            label: "name",
            type: "text",
            initialValue: selectedEditItem?.name || "",
            validation: yup
              .string()
              .min(3)
              .max(50)
              .required("name is required"),
          },
        ],
      },
    ];
  }, [selectedEditItem]);

  return editItemFormTabs;
};

export default useEditItemFormTabs;
