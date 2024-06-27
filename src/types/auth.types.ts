export interface Iuser {
  token: string;
  id: string;
  isAuthenticated: boolean;
  authorizations: string[];
  email: string;
}

export interface IuserData {
  email: string;
  authorizations: string[];
  firstName: string;
  lastName: string;
}
