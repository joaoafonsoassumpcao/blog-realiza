import axiosInstance from "../utils/axios";
import { createContext, useEffect, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  const login = async (inputs) => {
    try {
      const res = await axiosInstance.post("/api/login", inputs);

      setCookie(null, "token", res.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      setCurrentUser(res.data.user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (inputs) => {
    const res = await axiosInstance.post("/api/logout");
    destroyCookie(null, "token");
    setCurrentUser(null);
    router.push("/login");
  };

  const fetchUser = async () => {
    const { token } = parseCookies();
    if (!token) return;

    try {
      const res = await axiosInstance.get("/api/me");
      setCurrentUser(res.data.user);
    } catch (error) {
      console.log(error);
      destroyCookie(null, "token");
      setCurrentUser(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
