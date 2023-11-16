import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, IAuthContext } from "../../../contexts/authContext";
import { UserRole } from "../../../utils/enum/userEnum";
import Progress from "../Progress";
import { authCheck } from "./authCheck";
import { IUser } from "./types";

interface IProps {
  children: JSX.Element;
  role?: UserRole;
}

const ProtectedRoute = ({ children, role = UserRole.CUSTOMER }: IProps) => {
  const { getCurrentUser } = useContext(AuthContext) as IAuthContext;
  const [authStatus, setAuthStatus] = useState<string>("loading");

  useEffect(() => {
    getCurrentUser()
      .then((user: IUser) => {
        setAuthStatus(authCheck(user, role));
      })
      .catch(() => setAuthStatus("unauthenticated"));
  }, []);

  if (authStatus === "loading") {
    return <Progress />;
  }

  return authStatus === "authenticated" ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
