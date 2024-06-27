import * as yup from "yup";
import { IRule } from "../data.types/rule.types";
import { IchecklistTag } from "../data.types/checklist.types";

export type RequestType = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | Date
    | IRule[]
    | IchecklistTag
    | undefined;
};

export type FieldConfig<T extends RequestType> = {
  name: Extract<keyof T, string>;
  label: string;
  disabled?: boolean;
  initialValue:
    | string
    | string[]
    | boolean
    | number
    | Date
    | undefined
    | IchecklistTag;
  type:
    | "text"
    | "email"
    | "date"
    | "checkbox"
    | "select"
    | "multi-select"
    | "textarea"
    | "file"
    | "radio"
    | "number"
    | "multi-input"
    | "conditional-select"
    | "auto-complete"
    | "logic-creator";
  validation: yup.AnySchema;
  options?: string[] | IchecklistTag[];
  information?: string;
  imageExample?: string;
  bucketName?: string;
};

export type TabConfig<T extends RequestType> = {
  tabName: string;
  fields: FieldConfig<T>[];
  bucketName?: string;
  submitTitle?: string;
  submit?: (values: T) => void;
};
