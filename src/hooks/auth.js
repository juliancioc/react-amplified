import React, {
  createContext,
  FC,
  useCallback,
  useState,
  useContext,
} from "react";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { infoUserInactive } from "../store/modules/login/actions";


export const getToken = () => localStorage.getItem("@FleetSolutions:token");

export const AuthContext = createContext(
  {}
);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@FleetSolutions:token");
    const fullname = localStorage.getItem("@FleetSolutions:fullname");
    const userId = localStorage.getItem("@FleetSolutions:userId");

    if (token && fullname && userId) {
      return { token, fullname, userId };
    }

    return {};
  });

  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post("/signin", {
      login,
      password,
    });

    if (!response.data.registerActive) {
      console.log("user is not active");
      dispatch(infoUserInactive({ isActiveUser: false }));
    }

    const { token, fullname, userId } = response.data;
    localStorage.setItem("@FleetSolutions:token", token);
    localStorage.setItem("@FleetSolutions:fullname", fullname);
    localStorage.setItem("@FleetSolutions:userId", userId);

    setData({ token, fullname, userId });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@FleetSolutions:token");
    localStorage.removeItem("@FleetSolutions:fullname");
    localStorage.removeItem("@FleetSolutions:userId");

    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ fullname: data.fullname, userId: data.userId, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
