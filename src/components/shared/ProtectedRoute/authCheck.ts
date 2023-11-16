import { UserRole } from "../../../utils/enum/userEnum";
import { IUser } from "./types";

export const authCheck = (user: IUser, role: string): string => {
    if (user && (user.role === role || user.role === UserRole.ADMIN || user.role === UserRole.SUBACCOUNT)) {
      return "authenticated";
    } else {
      return "unauthenticated";
    }
  };