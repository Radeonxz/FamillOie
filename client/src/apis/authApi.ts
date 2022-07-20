import httpClient from "./httpClient";

const authApi = {
  signup: (params: any) => httpClient.post("auth/signup", params),
  login: (params: any) => httpClient.post("auth/login", params),
  verifyToken: () => httpClient.post("auth/verify-token")
};

export default authApi;
