export interface User {
  id: string,
  login: string;
  password: string;
}

export interface Data {
  users: User[];
}