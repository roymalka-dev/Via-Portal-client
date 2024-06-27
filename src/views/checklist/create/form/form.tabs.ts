import { checklistTags } from "@/configs/checklist.config";
import { RequestType, TabConfig } from "@/types/components.types/form.types";
import * as yup from "yup";

export const createChecklistExecutionTabs: TabConfig<RequestType>[] = [
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
        options: checklistTags,
        initialValue: [],
        validation: yup.array().min(0).of(yup.string().required()),
      },
    ],
  },
];
