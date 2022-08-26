import httpClient from "./httpClient";
import { Section } from "../types/Section.model";

const taskApi = {
  create: (boardId: string, params: Section) =>
    httpClient.post(`boards/${boardId}/tasks`, params),
  updatePosition: (boardId: string, params: Section) =>
    httpClient.put(`boards/${boardId}/tasks/update-position`, params),
  delete: (boardId: string, taskId: string) =>
    httpClient.delete(`boards/${boardId}/tasks/${taskId}`),
  update: (boardId: string, taskId: string, params: Section) =>
    httpClient.put(`boards/${boardId}/tasks/${taskId}`, params)
};

export default taskApi;
