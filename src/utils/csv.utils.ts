/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

// Define Yup schema for validation
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name should be at least 3 characters")
    .max(25, "Name should not exceed 25 characters")
    .required("Name is required"),
  description: yup
    .string()
    .min(3, "Description should be at least 3 characters")
    .max(256, "Description should not exceed 256 characters")
    .required("Description is required"),
  url: yup.string().url("URL must be a valid URL").required("URL is required"),
  tags: yup
    .array()
    .of(
      yup
        .string()
        .min(3, "Tag should be at least 3 characters")
        .max(25, "Tag should not exceed 25 characters")
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
        const lines = csvString.trim().split(/\r?\n/);
        const results: any[] = [];

        // Process each line, skipping the header
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i];
          if (!row.trim()) continue;

          // Parse CSV row using a regex to handle commas within quoted values
          const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          if (!values || values.length < 4) {
            console.error(`Invalid row format at line ${i + 1}: ${row}`);
            continue;
          }

          // Extract values and remove surrounding quotes
          const [name, description, url, tagsStr] = values.map((val) =>
            val.replace(/^"|"$/g, "").trim()
          );

          // Parse tags into array
          const tags = tagsStr.split(",").map((tag) => tag.trim());

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
            console.error(
              `Validation error for row ${i + 1}: ${JSON.stringify(obj)}`,
              error.errors
            );
            reject(error);
          }
        }

        resolve(results);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsText(file);
  });
};
