import httpClient from "./httpClient";
import {
  TaskCreateProps,
  TaskUpdateProps,
  TaskUpdatePositionProps
} from "../types/Task.models";
import { Section } from "../types/Section.model";

const taskApi = {
  create: (boardId: string, params: TaskCreateProps) =>
    httpClient.post(`boards/${boardId}/tasks`, params),
  updatePosition: (boardId: string, params: TaskUpdatePositionProps) =>
    httpClient.put(`boards/${boardId}/tasks/update-position`, params),
  delete: (boardId: string, taskId: string) =>
    httpClient.delete(`boards/${boardId}/tasks/${taskId}`),
  update: (boardId: string, taskId: string, params: TaskUpdateProps) =>
    httpClient.put(`boards/${boardId}/tasks/${taskId}`, params)
};

export default taskApi;
