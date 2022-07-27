import httpClient from "./httpClient";

const boardApi = {
  create: () => httpClient.post("boards"),
  getAll: () => httpClient.get("boards")
};

export default boardApi;
