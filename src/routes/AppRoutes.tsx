import React, { FC, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const AppRoutes: FC = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <Routes>
      {isLogin &&
        authRoutes.map((authRoute) => (
          <Route
            key={authRoute.path}
            path={authRoute.path}
            element={<authRoute.element />}
          />
        ))}
      {publicRoutes.map((publicRoute) => (
        <Route
          key={publicRoute.path}
          path={publicRoute.path}
          element={<publicRoute.element />}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
