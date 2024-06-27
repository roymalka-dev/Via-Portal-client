import { RequestType, TabConfig } from "@/types/components.types/form.types";
import * as yup from "yup";

export const travelLogicformTabs: TabConfig<RequestType>[] = [
  {
    tabName: "Polygons",
    fields: [
      {
        name: "polygons",
        label: "Enter Polygon",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().min(1).of(yup.string().required()),
        information: "Enter Polygon name",
      },
    ],
  },
  {
    tabName: "Tags",
    fields: [
      {
        name: "tags",
        label: "Enter Tag",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
        information: "Enter Taf name",
      },
    ],
  },
  {
    tabName: "Logic",
    fields: [
      {
        name: "logic",
        label: "",
        type: "logic-creator",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
      },
    ],
  },
  {
    tabName: "Name",
    fields: [
      {
        name: "name",
        label: "Enter Name",
        type: "text",
        initialValue: "",
        validation: yup.string().required("Name is required"),
      },
    ],
  },
];
