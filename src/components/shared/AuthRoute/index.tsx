import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, IAuthContext } from "../../../contexts/authContext";

interface IProps {
  children: JSX.Element;
}

const AuthRoute = ({ children }: IProps): JSX.Element => {
  const { user } = useContext(AuthContext) as IAuthContext;
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRoute;
