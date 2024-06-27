/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { KanbanBoard } from "@/components/common/kanban/KanbanBoard";
import { IKanbanColumnType } from "@/types/components.types/kanban.types";
import useFetch from "@/hooks/useFetch";
import { useSocket } from "@/hooks/useSocket";
import appConfig from "@/configs/app.config";
import { generateKanbanCols, sorters } from "./utils";
import KanbanCard from "@/components/common/kanban/KanbanCard";

const ChecklistExecutionPage = () => {
  const [cols, setCols] = useState<IKanbanColumnType[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<{
    columnId: string;
    criteria: string;
  } | null>(null);

  const execId = window.location.pathname.split("/").pop() || "";

  const { data, status, error } = useFetch<any>(
    `execution/get-execution/${execId}`
  );

  useEffect(() => {
    if (error) {
      console.log("Error: ", error);
    }
    if (status === "success" && data) {
      const generatedCols = generateKanbanCols(data.execution.items);
      setAssigneeOptions(data.assignees);
      setCols(generatedCols);
    }
  }, [data, error, status]);

  const { emit, on, off } = useSocket(appConfig.apiBaseUrl, {
    id: execId,
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 500,
  });

  const onDragEndHandler = useCallback(
    async (result: any): Promise<boolean> => {
      emit("cardLocationChange", {
        _id: result.draggableId,
        source: result.source.droppableId,
        destination: result.destination.droppableId,
        index: result.destination.index,
      });
      return true;
    },
    [emit]
  );

  const handleAssigneeChange = useCallback(
    async (assignee: string, cardId: string): Promise<void> => {
      emit("cardAssigneeChange", { assignee, cardId });

      setCols((prevCols) =>
        prevCols.map((col) => ({
          ...col,
          cards: col.cards.map((card) =>
            card._id === cardId ? { ...card, assignee } : card
          ),
        }))
      );
    },
    [emit]
  );

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (columnId: string, criteria: string) => {
    setSortBy({ columnId, criteria });
  };

  useEffect(() => {
    const handleCardLocationChange = (card: any) => {
      setCols((prevCols) => {
        const updatedCols = [...prevCols];

        const sourceColIndex = updatedCols.findIndex(
          (col) => col.id === card.source
        );
        const destColIndex = updatedCols.findIndex(
          (col) => col.id === card.destination
        );

        if (sourceColIndex === -1 || destColIndex === -1) return prevCols;

        const sourceCol = updatedCols[sourceColIndex];
        const destCol = updatedCols[destColIndex];
        const movedCard = sourceCol.cards.find((c) => c._id === card._id);

        if (!movedCard) return prevCols;

        const newSourceCards = sourceCol.cards.filter(
          (c) => c._id !== card._id
        );
        const newDestCards = [...destCol.cards];
        newDestCards.splice(card.index, 0, movedCard);

        updatedCols[sourceColIndex] = { ...sourceCol, cards: newSourceCards };
        updatedCols[destColIndex] = { ...destCol, cards: newDestCards };

        return updatedCols;
      });
    };

    const handleCardAssigneeChange = (assignee: string, cardId: string) => {
      setCols((prevCols) =>
        prevCols.map((col) => ({
          ...col,
          cards: col.cards.map((card) =>
            card._id === cardId ? { ...card, assignee } : card
          ),
        }))
      );
    };

    on("cardLocationChange", handleCardLocationChange);
    on("cardAssigneeChange", handleCardAssigneeChange);

    return () => {
      off("cardLocationChange", handleCardLocationChange);
      off("cardAssigneeChange", handleCardAssigneeChange);
    };
  }, [on]);

  const filters = assigneeOptions.map((assignee) => ({
    name: assignee,
    value: assignee,
  }));

  return (
    <Box>
      <KanbanBoard
        cols={cols}
        onDragEndHandler={onDragEndHandler}
        cardUi={(props) => (
          <KanbanCard
            card={props.card}
            assigneeOptions={assigneeOptions}
            onAssigneeChange={handleAssigneeChange}
          />
        )}
        filters={filters}
        sorters={sorters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        selectedFilters={selectedFilters}
        sortBy={sortBy}
      />
    </Box>
  );
};

export default ChecklistExecutionPage;
