import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { IDecodedToken } from "../components/features/guard/authGuard";
import jwt_decode from "jwt-decode";

export interface IAuthContext {
  user: Record<string, any>;
  // TODO: Add types
  getCurrentUser: any;
  logout: any;
}

export const AuthContext = createContext({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Record<string, any> | null>(null);

  const getCurrentUser = async () => {
    if (user) {
      return user;
    }

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return null;
    }

    const localStorageUser = localStorage.getItem("user");
    if (!localStorageUser) {
      return null;
    }

    const newUser = JSON.parse(localStorageUser);
    const decodedToken: IDecodedToken = jwt_decode(accessToken);
    newUser.role = decodedToken.role
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, getCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
