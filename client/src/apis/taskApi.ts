import httpClient from "./httpClient";

const taskApi = {
  create: (boardId: string, params: any) =>
    httpClient.post(`boards/${boardId}/tasks`, params),
  updatePosition: (boardId: string, params: any) =>
    httpClient.put(`boards/${boardId}/tasks/update-position`, params),
  delete: (boardId: string, taskId: string) =>
    httpClient.delete(`boards/${boardId}/tasks/${taskId}`),
  update: (boardId: string, taskId: string, params: any) =>
    httpClient.put(`boards/${boardId}/tasks/${taskId}`, params)
};

export default taskApi;
