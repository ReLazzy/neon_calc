import React, { FC } from "react";
import {  Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";

const AppRoutes: FC = () => {
  return (
    <Routes>
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