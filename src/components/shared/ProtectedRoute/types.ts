import { UserType } from '../../features/AdminDashboard/types';

export interface IUser extends UserType {
  firstName: string;
  lastName: string;
  picture: string;
}