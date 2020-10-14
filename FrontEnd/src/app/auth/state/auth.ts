export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  user: IUser;
  isSuccess: any;
}

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
