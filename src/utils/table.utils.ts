import {
  TableColsType,
  TableDataType,
} from "@/types/components.types/table.types";

export const getStatusChipColor = (
  status: string
): { backgroundColor: string; opacity: number; color: string } => {
  switch (status.toLowerCase()) {
    case "failed":
      return { backgroundColor: "#FF0000", opacity: 0.5, color: "#FFFFFF" };
    case "done":
      return { backgroundColor: "#008000", opacity: 0.5, color: "#FFFFFF" };
    case "inProgress":
      return { backgroundColor: "#0000FF", opacity: 0.5, color: "#FFFFFF" };
    case "todo":
      return { backgroundColor: "#FFD700", opacity: 0.5, color: "#000000" };

    case "pending":
      return { backgroundColor: "#FFD700", opacity: 0.5, color: "#000000" };
    default:
      return { backgroundColor: "#000000", opacity: 0.5, color: "#FFFFFF" };
  }
};

export const getChipColorByIndex = (index: number) => {
  const opacity = 0.2;
  const colors = [
    `rgba(54, 162, 235, ${opacity})`, // Blue
    `rgba(255, 206, 86, ${opacity})`, // Yellow
    `rgba(255, 99, 132, ${opacity})`, // Red
    `rgba(75, 192, 192, ${opacity})`, // Green
    `rgba(153, 102, 255, ${opacity})`, // Purple
    `rgba(255, 159, 64, ${opacity})`, // Orange
  ];
  return colors[index % colors.length];
};

export const tableDataGenerator = ({
  rows,
  cols,
  toolbar,
}: TableDataType): TableDataType => {
  return {
    toolbar,
    cols,
    rows,
  };
};

export const comperators = {
  string: (a: string, b: string) => a?.localeCompare(b),
  stringArray: (a: string[], b: string[]) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const comparison = a[i]?.localeCompare(b[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return a.length - b.length;
  },
  number: (a: number, b: number) => a - b,
  date: (a: string, b: string) =>
    new Date(a)?.getTime() - new Date(b)?.getTime(),
};

export const calculateStickyLeftPositions = (cols: TableColsType[]) => {
  const leftPositions: number[] = [];
  let cumulativeWidth = 0;

  cols.forEach((col, index) => {
    leftPositions[index] = cumulativeWidth;
    if (col.isLocked) {
      cumulativeWidth += col.width || 100; // Default width if not specified
    }
  });

  return leftPositions;
};
