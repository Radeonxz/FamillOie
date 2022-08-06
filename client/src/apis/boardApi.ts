import httpClient from "./httpClient";

const boardApi = {
  create: () => httpClient.post("boards"),
  getAll: () => httpClient.get("boards"),
  updatePosition: (params: any) => httpClient.put("boards", params),
  getBoardById: (boardId: string | undefined) =>
    httpClient.get(`boards/${boardId}`),
  update: (boardId: string | undefined, params: any) =>
    httpClient.put(`boards/${boardId}`, params)
};

export default boardApi;
