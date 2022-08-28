import httpClient from "./httpClient";
import {
  Board,
  BoardUpdateProps,
  BoardUpdatePositionProps,
  BoardUpdateFavoritePositionProps
} from "../types/Board.models";

const boardApi = {
  create: () => httpClient.post("boards"),
  getAll: () => httpClient.get("boards"),
  updatePosition: (params: BoardUpdatePositionProps) =>
    httpClient.put("boards", params),
  getBoardById: (boardId: string | undefined) =>
    httpClient.get(`boards/${boardId}`),
  deleteBoardById: (boardId: string | undefined) =>
    httpClient.delete(`boards/${boardId}`),
  update: (boardId: string | undefined, params: BoardUpdateProps) =>
    httpClient.put(`boards/${boardId}`, params),
  getFavorites: () => httpClient.get("boards/favorites"),
  updateFavoritePosition: (params: BoardUpdateFavoritePositionProps) =>
    httpClient.put("boards/favorites", params)
};

export default boardApi;
