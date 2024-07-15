import { TableData } from "./PageBuilder";

export const ScopingTableBuilder = (tableData: TableData): string => {
  const headers = tableData.headers
    ? `<tr>${tableData.headers
        .map((header) => `<th>${header}</th>`)
        .join("")}</tr>`
    : "";

  const rows = tableData.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `
    <table>
      ${headers}
      ${rows}
    </table>
  `;
};
