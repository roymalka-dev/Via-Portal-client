import { TableData } from "./PageBuilder";

export const ScopingTableBuilder = (tableData: TableData) => {
  // Determine the number of columns based on headers or first row length
  const columnCount = tableData.headers
    ? tableData.headers.length
    : tableData.rows[0]
    ? tableData.rows[0].length
    : 1;

  return `
    <div style="max-width: 900px; margin-left: 0;">
      <table class="confluenceTable" data-layout="default" style="width: 760px; table-layout: fixed;">
        <colgroup>
          ${Array(columnCount).fill('<col style="width: 50%;"/>').join("")}
        </colgroup>
        <thead>
          ${
            tableData.headline
              ? `
          <tr>
            <td class="confluenceTd" colspan="${columnCount}" data-highlight-colour="#b3bac5">
              <h3>${tableData.headline}</h3>
            </td>
          </tr>`
              : ""
          }
          ${
            tableData.headers
              ? `
          <tr>
            ${tableData.headers
              .map(
                (header) => `
              <td class="confluenceTd" data-highlight-colour="#b3bac5">
                <h4>${header}</h4>
              </td>
            `
              )
              .join("")}
          </tr>`
              : ""
          }
        </thead>
        <tbody>
          ${
            tableData.rows &&
            tableData.rows
              .map(
                (row) => `
            <tr>
              ${row
                .map(
                  (cell) => `
                <td class="confluenceTd" data-highlight-colour="#f4f5f7">
                  <p>${cell}</p>
                </td>
              `
                )
                .join("")}
            </tr>
          `
              )
              .join("")
          }
        </tbody>
      </table>
    </div>
  `;
};
