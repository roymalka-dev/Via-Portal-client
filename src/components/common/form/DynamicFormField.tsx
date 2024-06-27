/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Field } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import ConditionalSelect from "@/components/ui/inputs/ConditionalSelect";
import LogicCreator from "@/components/ui/inputs/LogicCreator";
import MultiInputField from "@/components/ui/inputs/MultiInputField";
import MultiSelectField from "@/components/ui/inputs/MultiSelectField";
import SelectField from "@/components/ui/inputs/SelectField";
import TextFieldWithInfo from "@/components/ui/inputs/TextFieldWithInfo";
import { FieldConfig, RequestType } from "@/types/components.types/form.types";
import AutocompleteField from "@/components/ui/inputs/AutocompleteField";

/**
 * DynamicField component renders different form input fields based on the type provided in FieldConfig.
 * @param {FieldConfig<RequestType>} props - Component props containing field configuration.
 * @returns {JSX.Element} DynamicField component
 */
const DynamicField: React.FC<FieldConfig<RequestType>> = ({
  name,
  label,
  type,
  options,
  information,
  imageExample,
  disabled,
}) => {
  return (
    <Field name={name}>
      {({ field }: any) => {
        if (type === "checkbox") {
          return (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={label}
            />
          );
        }

        if (type === "select") {
          return (
            <SelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "logic-creator") {
          return <LogicCreator />;
        }

        // Handle multi-select
        if (type === "multi-select") {
          return (
            <MultiSelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "multi-input") {
          return (
            <MultiInputField
              name={String(name)}
              label={label}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "conditional-select") {
          return (
            <ConditionalSelect
              name={String(name)}
              selectLabel={label}
              textFieldLabel="Specify Other"
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "auto-complete") {
          return (
            <AutocompleteField
              name={String(name)}
              options={options || []}
              information={information}
              imageExample={imageExample}
              label={label}
            />
          );
        }

        return (
          <TextFieldWithInfo
            name={String(name)}
            label={label}
            type={type}
            information={information}
            imageExample={imageExample || ""}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
            disabled={disabled}
          />
        );
      }}
    </Field>
  );
};

export default DynamicField;
