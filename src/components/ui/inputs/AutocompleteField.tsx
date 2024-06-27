/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useField, useFormikContext } from "formik";
import { Autocomplete, Chip, TextField, FormControl } from "@mui/material";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleTooltip";

interface AutocompleteFieldProps {
  name: string;
  label: string;
  options: string[];
  information?: string;
  imageExample?: string;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  name,
  label,
  options,
  information,
  imageExample,
}) => {
  const { setFieldValue } = useFormikContext<string[]>();
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <FormControl fullWidth error={isError} variant="outlined" sx={{ mb: 2 }}>
      <Autocomplete
        multiple
        options={options}
        value={field.value || []}
        onChange={(_event, value) => setFieldValue(name, value)}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              onMouseDown={(event) => {
                // Prevent the autocomplete dropdown from opening
                event.stopPropagation();
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            error={isError}
            helperText={isError ? meta.error : ""}
          />
        )}
      />
      {information && <InformationTooltip information={information} />}
      {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}
    </FormControl>
  );
};

export default AutocompleteField;
