import httpClient from "./httpClient";
import { Section } from "../types/Section.model";

const sectionApi = {
  create: (boardId: string | undefined) =>
    httpClient.post(`boards/${boardId}/sections`),
  update: (
    boardId: string | undefined,
    sectionId: string | undefined,
    params: Section
  ) => httpClient.put(`boards/${boardId}/sections/${sectionId}`, params),
  delete: (boardId: string | undefined, sectionId: string | undefined) =>
    httpClient.delete(`boards/${boardId}/sections/${sectionId}`)
};

export default sectionApi;
