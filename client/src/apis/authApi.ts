import httpClient from "./httpClient";
import { UserSignUpProps, UserLoginProps } from "../types/User.model";

const authApi = {
  signup: (params: UserSignUpProps) => httpClient.post("auth/signup", params),
  login: (params: UserLoginProps) => httpClient.post("auth/login", params),
  verifyToken: () => httpClient.post("auth/verify-token")
};

export default authApi;
