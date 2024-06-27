/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IKanbanCardType,
  IKanbanColumnType,
} from "@/types/components.types/kanban.types";

export const generateKanbanCols = (
  data: IKanbanCardType[]
): IKanbanColumnType[] => {
  const pending: IKanbanColumnType = {
    id: "pending",
    title: "To Do",
    cards: [],
  };
  const inProgress: IKanbanColumnType = {
    id: "inProgress",
    title: "In Progress",
    cards: [],
  };
  const done: IKanbanColumnType = {
    id: "done",
    title: "Done",
    cards: [],
  };

  data?.forEach((request) => {
    const task: IKanbanCardType = {
      _id: request._id,
      name: request.name,
      status: request.status,
      data: request.data,
      description: request.description,
      assignee: request.assignee || "Unassigned",
      url: request.url,
    };

    if (request.status === "pending") {
      pending.cards.push(task);
    } else if (request.status === "inProgress") {
      inProgress.cards.push(task);
    } else if (request.status === "done") {
      done.cards.push(task);
    }
  });

  return [pending, inProgress, done];
};

export const filters = [
  { name: "John Doe", value: "John Doe" },
  { name: "Jane Smith", value: "Jane Smith" },
  { name: "Alice Johnson", value: "Alice Johnson" },
];

export const sorters = [
  { name: "Name", value: "name" },
  { name: "ID", value: "id" },
  { name: "Assignee", value: "assignee" },
];
