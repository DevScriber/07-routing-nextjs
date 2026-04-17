export type Tags = "Todo" | "Personal" | "Work" | "Meeting" | "Shopping";

export default interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tags;
  createdAt: string;
  updatedAt: string;
}
