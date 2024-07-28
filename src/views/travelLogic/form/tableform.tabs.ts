import { RequestType, TabConfig } from "@/types/components.types/form.types";
import * as yup from "yup";

export const travelLogicformTabs: TabConfig<RequestType>[] = [
  {
    tabName: "logic",
    fields: [
      {
        name: "polygons",
        label: "Enter Polygon",
        type: "3-multi-field",
        initialValue: [""],
        validation: yup.array().min(1).of(yup.string().required()),
        information: "Enter Polygon name",
      },
    ],
  },
];
