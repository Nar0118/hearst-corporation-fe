import jwt_decode from "jwt-decode";
import { UserRole } from "../../../utils/enum/userEnum";

export interface IDecodedToken {
  role: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
}

export const AuthGuard = (): string | undefined => {
  const token: string | null = localStorage.getItem("access_token");
  let role = null;
  if (token) {
    const decodedToken: IDecodedToken = jwt_decode(token);
    if (!decodedToken) {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      return "/login";
    }
    role = decodedToken?.role;
    if (role === UserRole.CUSTOMER || role === UserRole.SUBACCOUNT) {
      return "/";
    } else if(role === UserRole.ADMIN){
      return "/admin";
    }
  }
};
