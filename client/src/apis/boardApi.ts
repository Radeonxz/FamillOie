import httpClient from "./httpClient";
import { Board } from "../types/Board.model";

const boardApi = {
  create: () => httpClient.post("boards"),
  getAll: () => httpClient.get("boards"),
  updatePosition: (params: Board[]) => httpClient.put("boards", params),
  getBoardById: (boardId: string | undefined) =>
    httpClient.get(`boards/${boardId}`),
  deleteBoardById: (boardId: string | undefined) =>
    httpClient.delete(`boards/${boardId}`),
  update: (boardId: string | undefined, params: Board) =>
    httpClient.put(`boards/${boardId}`, params),
  getFavorites: () => httpClient.get("boards/favorites"),
  updateFavoritePosition: (params: Board[]) =>
    httpClient.put("boards/favorites", params)
};

export default boardApi;
