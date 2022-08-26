export interface User {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserSignUpProps extends User {
  confirmPassword: string;
}

export interface UserLoginProps extends User {}
