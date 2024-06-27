/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  IKanbanColumnType,
  IKanbanFilterOption,
  IKanbanSortOption,
} from "@/types/components.types/kanban.types";
import KanbanFilterDropdown from "./KanbanFilterDropdown";
import SortDropdown from "./KanbanSortDropdown";

interface IKanbanBoardProps {
  cols: IKanbanColumnType[];
  cardUi: React.FC<any>;
  onDragEndHandler: (result: any) => Promise<boolean>;
  filters: IKanbanFilterOption[];
  sorters: IKanbanSortOption[];
  onFilterChange: (filters: string[]) => void;
  onSortChange: (columnId: string, sortBy: string) => void;
  selectedFilters: string[];
  sortBy: {
    columnId: string;
    criteria: string;
  } | null;
  title?: string;
}

export const KanbanBoard: React.FC<IKanbanBoardProps> = ({
  cols,
  cardUi: CardUi,
  onDragEndHandler,
  filters,
  sorters,
  onFilterChange,
  onSortChange,
  selectedFilters,
  sortBy,
  title,
}) => {
  const [columns, setColumns] = useState<IKanbanColumnType[]>(cols);

  useEffect(() => {
    setColumns(cols);
  }, [cols]);

  const applyFiltersAndSorting = useCallback(() => {
    let updatedCols = [...cols];

    // Apply filtering
    if (selectedFilters.length > 0) {
      updatedCols = updatedCols.map((col) => ({
        ...col,
        cards: col.cards.filter((card) =>
          selectedFilters.includes(card.assignee)
        ),
      }));
    }

    // Apply sorting
    if (sortBy) {
      updatedCols = updatedCols.map((col) => {
        if (col.id === sortBy.columnId) {
          return {
            ...col,
            cards: [...col.cards].sort((a, b) => {
              if (sortBy.criteria === "name") {
                return a.name?.localeCompare(b.name);
              }
              if (sortBy.criteria === "id") {
                return a._id.localeCompare(b._id);
              }
              if (sortBy.criteria === "assignee") {
                return (a.assignee || "").localeCompare(b.assignee || "");
              }
              return 0;
            }),
          };
        }
        return col;
      });
    }

    setColumns(updatedCols);
  }, [cols, selectedFilters, sortBy]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]);

  const updateCardLocation = (
    cardId: string,
    sourceColId: string,
    destColId: string,
    destIndex: number
  ) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      // Find the source and destination columns
      const sourceColIndex = updatedColumns.findIndex(
        (col) => col.id === sourceColId
      );
      const destColIndex = updatedColumns.findIndex(
        (col) => col.id === destColId
      );

      // Remove the card from the source column
      const [movedCard] = updatedColumns[sourceColIndex].cards.splice(
        updatedColumns[sourceColIndex].cards.findIndex(
          (card) => card._id === cardId
        ),
        1
      );

      // Add the card to the destination column at the specified index
      updatedColumns[destColIndex].cards.splice(destIndex, 0, movedCard);

      return updatedColumns;
    });
  };

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    // If no destination or the item is dropped in the same position, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    // Update the card location optimistically
    updateCardLocation(
      result.draggableId,
      sourceColId,
      destColId,
      destination.index
    );

    // Await the result of the onDragEndHandler function
    const success = await onDragEndHandler(result);

    // If the update fails, revert the state to the previous state
    if (!success) {
      setColumns(cols);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <KanbanFilterDropdown
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          gap: "20px",
          padding: "20px",
          overflowX: "auto",
          minHeight: "100vh",
        }}
      >
        {columns.map((column) => (
          <Droppable droppableId={column.id.toString()} key={column.id}>
            {(provided) => (
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "300px",
                  maxHeight: "80vh",
                }}
                elevation={3}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6">{column.title}</Typography>
                  <Typography variant="h6">{column.cards?.length}</Typography>
                  <SortDropdown
                    columnId={column.id}
                    sorters={sorters}
                    onSortChange={onSortChange}
                  />
                </Box>
                <Box sx={{ flex: 1, overflowY: "auto" }}>
                  {column.cards.map((card, index) => (
                    <Draggable
                      key={card._id}
                      draggableId={card._id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ margin: "8px" }}
                        >
                          <CardUi card={card} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                </Box>
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanBoard;
