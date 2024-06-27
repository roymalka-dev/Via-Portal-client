import { IKanbanCardType } from "../components.types/kanban.types";

export interface IChecklistItem {
  _id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
}
export interface IChecklistItemExecution extends IChecklistItem {
  status: "pending" | "inProgress" | "done" | "failed" | "skipped";
  assignee: string;
  comment: string;
}

export interface IChecklistKanbanCardType extends IKanbanCardType {
  data: IChecklistItemExecution;
}

export interface IchecklistTag {
  _id: string;
  name: string;
}
