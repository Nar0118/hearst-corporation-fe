export type UserType = {
  companyName: string;
  email: string;
  id: number;
  password: string;
  role: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  picture?: string | null;
};

export interface ISearchUser {
  totalPages: number;
  currentPage: number;
  users: UserType[];
}
