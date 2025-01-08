import React, { useContext, useState } from "react";
import AppRoutes from "../../routes/AppRoutes";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../routes/routes";
import { AuthContext } from "../../App";

const AuthPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    navigate(RouteNames.MAIN_ROUTE);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="d-flex flex-col gap-4">
        <div className="w-[300px]">
          <label className="mb-1 block text-sm font-semibold">
            Введите имя
          </label>
          <textarea
            onChange={(e) => setName(e.target.value)}
            rows={1}
            className="w-[300px] resize-none overflow-hidden rounded-md border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Павел"
          />
        </div>
        <div className="w-[300px]">
          <label className="mb-1 block text-sm font-semibold">
            Введите пароль
          </label>
          <textarea
            onChange={(e) => setPassword(e.target.value)}
            rows={1}
            className="w-[300px] resize-none overflow-hidden rounded-md border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            handleSaveToLocalStorage();
            setIsLogin(true);
          }}
          className="right-2 top-2 z-10 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
