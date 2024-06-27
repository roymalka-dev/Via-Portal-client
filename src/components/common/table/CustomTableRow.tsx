import React from "react";
import { TableCell, TableRow, useTheme } from "@mui/material";
import {
  TableColsType,
  tableRowsType,
} from "@/types/components.types/table.types";

/**
 * Interface for the props of the CustomTableRow component.
 */
interface TableRowComponentProps {
  /**
   * The data object for the current row. Each key in this object corresponds to a column in the table.
   */
  row: tableRowsType;

  /**
   * An array of column definitions for the table. This includes information on how to render the data for each column.
   */
  columns: TableColsType[];

  /**
   * The position of the left edge of the sticky column.
   */
  leftPositions: number[];
}

/**
 * CustomTableRow component renders a single row in the table.
 * It iterates over each column definition and creates a table cell for each column based on the row data provided.
 *
 * This component is used within the body of the table to display data rows with proper formatting and alignment.
 *
 * @param {TableRowComponentProps} props The properties for the CustomTableRow component.
 * @returns {JSX.Element} A table row element with cells corresponding to each column in the table.
 */
const CustomTableRow: React.FC<TableRowComponentProps> = ({
  row,
  columns,
  leftPositions = [],
}) => {
  const theme = useTheme();

  return (
    <TableRow dir={theme.direction}>
      {columns.map((column, index) => {
        const cellValue = row[column.name];
        const isLocked = column.isLocked || false;
        const leftPosition = leftPositions[index];

        return (
          <TableCell
            sx={{
              maxWidth: "350px",
              minWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              borderSpacing: 0,
              border: "1px solid #ccc",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={
              isLocked
                ? {
                    position: "sticky",
                    left: leftPosition,
                    zIndex: 2,
                    backgroundColor: theme.palette.background.default,
                  }
                : {}
            }
            key={`${column.name}-${index}`}
            align={
              index === 0 || isLocked
                ? "left"
                : theme.direction === "ltr"
                ? "center"
                : "center"
            }
          >
            {column.render ? column.render(cellValue, row) : cellValue}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CustomTableRow;
