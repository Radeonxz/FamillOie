export interface User {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserSignUpProps {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginProps {
  username: string;
  password: string;
}
