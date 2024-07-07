/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IKanbanCardType {
  _id: string;
  name: string;
  status: string;
  description: string;
  assignee: string;
  tags: string[];
  url: string;

  data?: any;
  assigneeOptions?: string[];
  onAssigneeChange?: (newAssignee: string, cardId: string) => void;
}

export interface IKanbanColumnType {
  id: string;
  title: string;
  cards: IKanbanCardType[];
}

export interface KanbanBoardType {
  columns: IKanbanColumnType[];
}

export interface IKanbanFilterOption {
  [key: string]: { name: string; value: string }[];
}

export interface IKanbanSortOption {
  name: string;
  value: string;
}
