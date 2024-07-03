/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

// Define Yup schema for validation
const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Name should be at least 1 character")
    .max(25, "Name should not exceed 25 characters")
    .required("Name is required"),
  description: yup
    .string()
    .min(1, "Description should be at least 1 character")
    .max(256, "Description should not exceed 256 characters")
    .required("Description is required"),
  url: yup.string().url("URL must be a valid URL").required("URL is required"),
  tags: yup
    .array()
    .of(
      yup
        .string()
        .min(1, "Tag should be at least 1 character")
        .max(50, "Tag should not exceed 25 characters")
    )
    .required("At least one tag is required"),
});

interface CSVRow {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

/**
 * Converts a CSV file to an array of objects, validates each object using Yup schema.
 * @param file The CSV file object (from input type file).
 * @returns Array of validated objects if successful, null if there's an error.
 */
export const convertCSVtoObject = async (file: File): Promise<any[] | null> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const csvString = event.target?.result as string;
        const lines = csvString.split(/\r?\n/);
        const results: any[] = [];

        // Skip the header row and process each line
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i];
          if (!row.trim()) continue;

          // Parse CSV row using a regex to handle commas within quoted values
          const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
          if (!values || values.length < 4) {
            console.log(`Invalid row format at line ${i + 1}: ${row}`);
            continue;
          }

          // Extract values and handle specific fields differently
          const name = values[0]; // Keep as-is
          const description = values[1]; // Keep as-is
          const url = values[2]; // Keep as-is
          const tagsStr = values[3]; // Keep as-is

          // Parse tags into array, trimming spaces around each tag
          const tags = tagsStr.split(",").map((tag) => tag);

          // Create object with parsed data
          const obj: CSVRow = {
            name,
            description,
            url,
            tags,
          };

          try {
            // Validate object against schema
            await schema.validate(obj, { abortEarly: false });
            results.push(obj); // Push validated object to results
          } catch (error: any) {
            console.log(
              `Validation error for row ${i + 1}: ${JSON.stringify(obj)}`,
              error.errors
            );
            reject(
              new Error(`Validation error at row ${i + 1}: ${error.errors}`)
            );
            return;
          }
        }

        resolve(results);
      } catch (error) {
        console.error("Error processing CSV file:", error);
        reject(new Error(`Error processing CSV file: ${error}`));
      }
    };

    reader.onerror = () => {
      console.error("Error reading CSV file");
      reject(new Error("Error reading CSV file"));
    };

    reader.readAsText(file);
  });
};
