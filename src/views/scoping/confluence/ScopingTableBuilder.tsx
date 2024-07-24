import { TableData } from "./PageBuilder";

export const ScopingTableBuilder = (tableData: TableData): string => {
  // Ensure there is at least one column
  const columnCount = tableData.headers ? tableData.headers.length : 1;

  // Create the headline row with a `colspan` that spans all header columns
  const headline = tableData.headline
    ? `<tr><th colspan="${columnCount}">${tableData.headline}</th></tr>`
    : "";

  // Create the header row
  const headers = tableData.headers
    ? `<tr>${tableData.headers
        .map((header) => `<th>${header}</th>`)
        .join("")}</tr>`
    : "";

  // Generate the body rows
  const rows = tableData.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  // Combine everything into the table HTML
  return `
    <table style="width: 70%; border-collapse: collapse;">
      <tbody>
        ${headers}
        ${headline} 
      
        ${rows}
      </tbody>
    </table>
  `;
};
