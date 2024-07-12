/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from "papaparse";
export const csvConfigsInterpreter = (
  file: File
): Promise<Record<string, string>> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data as string[][];
        if (data.length < 4) {
          reject("CSV file does not have enough rows");
        } else {
          const keyRow = data[0];
          const valueRow = data[3];
          const keyValueMap: Record<string, string> = {};

          keyRow.forEach((key, index) => {
            keyValueMap[key] = valueRow[index];
          });

          resolve(keyValueMap);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
