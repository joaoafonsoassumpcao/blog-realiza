// use nookies to store the token in the cookie
import nookies from "nookies";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (inputs) => {
    const res = await axios.post(`${process.env.HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    if (data.user) {
      setCurrentUser(data.user);
      nookies.set(undefined, "token", data.token, { path: "/" });
    }
  };

  const logout = async () => {
    const res = await axios.post(`${process.env.HOST}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setCurrentUser(null);
      nookies.destroy(undefined, "token", { path: "/" });
    }
  };

  useEffect(() => {
    const token = nookies.get(undefined, "token", { path: "/" }).token;
    if (token) {
      fetch(`${process.env.HOST}/api/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setCurrentUser(data.user);
        });
    }
  }, [currentUser]);
};
