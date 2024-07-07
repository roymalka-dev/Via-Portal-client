/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { KanbanBoard } from "@/components/common/kanban/KanbanBoard";
import {
  IKanbanColumnType,
  IKanbanFilterOption,
} from "@/types/components.types/kanban.types";
import useFetch from "@/hooks/useFetch";
import { useSocket } from "@/hooks/useSocket";
import appConfig from "@/configs/app.config";
import { generateKanbanCols, sorters } from "./utils";
import KanbanCard from "@/components/common/kanban/KanbanCard";
import { generateColorFromName, generateInitials } from "@/utils/avatar.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TagsDisplay from "@/components/ui/tags/TagsDisplay";
import useModal from "@/hooks/useModal";
import EditExecution from "./edit-execution/EditExecution";
import { CustomModal } from "@/components/common/modal/CustomModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { verifyAuthority } from "@/utils/auth.utils";
export interface IFilters {
  assignee: string[];
  tags: string[];
}

const ChecklistExecutionPage = () => {
  const [cols, setCols] = useState<IKanbanColumnType[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IFilters>({
    assignee: [],
    tags: [],
  });
  const [filters, setFilters] = useState<IKanbanFilterOption>({
    assignee: [],
    tags: [],
  });
  const [onlineAssignees, setOnlineAssignees] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<{
    columnId: string;
    criteria: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const execId = window.location.pathname.split("/").pop() || "";

  const user = useSelector((state: RootState) => state.auth);
  const userEmail = user.email;
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const { data, status, error, refetch } = useFetch<any>(
    `execution/get-execution/${execId}`
  );

  const modal = useModal();

  useEffect(() => {
    if (error) {
      console.log("Error: ", error);
    }
    if (status === "success" && data) {
      const generatedCols = generateKanbanCols(data?.execution?.items);
      setAssigneeOptions([...data.assignees, "Unassigned"]);
      setCols(generatedCols);

      const filters: IKanbanFilterOption = {
        assignee: data?.assignees.map((assignee: string) => ({
          name: assignee,
          value: assignee,
        })),
        tags: data?.execution?.tags?.map((tag: string) => ({
          name: tag,
          value: tag,
        })),
      };
      setFilters(filters);
    }
  }, [data, error, status]);

  const { emit, on, off } = useSocket(
    appConfig.apiBaseUrl,
    {
      query: { userEmail, id: execId },
      id: execId,
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 500,
    },
    [user, execId]
  );

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

  const handleEditExecution = () => {
    modal.setContent(
      <EditExecution id={execId} close={modal.closeModal} reload={refetch} />
    );

    modal.openModal();
  };

  const handleFilterChange = (filters: {
    assignee: string[];
    tags: string[];
  }) => {
    setSelectedFilters(filters);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
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

    const handleConnectedUsers = (users: string[]) => {
      setOnlineAssignees(users);
    };

    on("cardLocationChange", handleCardLocationChange);
    on("cardAssigneeChange", handleCardAssigneeChange);
    on("connectedUsers", handleConnectedUsers);

    return () => {
      off("cardLocationChange", handleCardLocationChange);
      off("cardAssigneeChange", handleCardAssigneeChange);
    };
  }, [on]);

  return (
    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        sx={{ ml: 4, alignItems: "center", gap: 1 }}
      >
        <Typography variant="h2" sx={{ mr: 2 }}>
          {data?.execution?.name}
        </Typography>
        {onlineAssignees.map((assignee) => (
          <Avatar
            key={assignee}
            sx={{
              bgcolor: generateColorFromName(assignee),
              color: themeMode === "light" ? "white" : "white",
              opacity: themeMode === "light" ? 0.5 : 0.7,
              border:
                themeMode === "dark" ? "2px solid #fff" : "2px solid #fff",
            }}
          >
            {generateInitials(assignee)}
          </Avatar>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignContent: "center",
          alignItems: "center",
          ml: 2,
          mt: 5,
          mb: -7,
        }}
      >
        <TagsDisplay tags={data?.execution?.tags || []} />
        {verifyAuthority("ADMIN", user.authorizations) && (
          <IconButton onClick={handleEditExecution}>
            <EditNoteIcon />
          </IconButton>
        )}
      </Box>

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
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default ChecklistExecutionPage;
