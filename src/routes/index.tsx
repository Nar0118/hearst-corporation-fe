import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import AdminDashboard from "../components/features/AdminDashboard";
import Main from "../pages/Main/Main";
import Miners from "../pages/Miners";
import Contracts from "../pages/Contracts";
import ContractData from "../pages/ContractData";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import AuthRoute from "../components/shared/AuthRoute";
import { UserRole } from "../utils/enum/userEnum";
import HomeHeader from "../components/features/homeHeader";
import SubAccount from '../pages/SubAccount';

type RouteType = {
  path: string;
  element: JSX.Element;
};

const routes: RouteType[] = [
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <>
          <HomeHeader />
          <Main />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={UserRole.ADMIN}>
        <>
          <HomeHeader />
          <AdminDashboard />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <>
          <HomeHeader />
          <Home />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/subAccount",
    element: (
      <ProtectedRoute>
        <>
          <HomeHeader />
          <SubAccount />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/contract/:id",
    element: (
      <ProtectedRoute role={UserRole.ADMIN}>
        <>
          <HomeHeader />
          <ContractData />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/contracts",
    element: (
      <ProtectedRoute>
        <>
          <HomeHeader />
          <Contracts />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/miners",
    element: (
      <ProtectedRoute>
        <>
          <HomeHeader />
          <Miners title="miners" src="https://lookerstudio.google.com/embed/reporting/ca3a01c5-7dee-47a8-ac49-49ddb3e993a6/page/1M"/>
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/mining-performance",
    element: (
      <ProtectedRoute>
        <>
          <HomeHeader />
          <Miners title="mining-performance" src="https://lookerstudio.google.com/embed/reporting/f224d282-96e3-406f-8bb7-ea613501b4fb/page/1M" />
        </>
      </ProtectedRoute>
    ),
  },
];

const RoutesComponent = () => {
  return (
    <Routes>
      {routes.map((route: RouteType, index: number) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default RoutesComponent;
