/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api_url = import.meta.env.VITE_BACKENDURL;

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if there's a one-time OAuth token in the URL (from Google sign-in redirect)
        const params = new URLSearchParams(window.location.search);
        const oauthToken = params.get("token");

        if (oauthToken) {
          // Exchange the one-time token for user data + session
          const res = await axios.post(
            `${api_url}/auth/exchange-token`,
            { token: oauthToken },
            { timeout: 15000, withCredentials: true }
          );
          setUser(res.data.user);

          // Remove the token from the URL without reloading
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          window.history.replaceState({}, "", url.pathname);
          return;
        }

        // No OAuth token — check existing session
        const res = await axios.get(`${api_url}/user/session`, {
          timeout: 10000,
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Auth init failed:", err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [api_url]);

  const signup = async (userData) => {
    const res = await axios.post(`${api_url}/user/signup`, userData, {
      timeout: 15000,
      withCredentials: true,
    });

    setUser(res.data.User);
  };

  const login = (userData) => {
    setUser(userData);
  };
  const logout = async () => {
    await axios.post(`${api_url}/user/logout`, null, {
      timeout: 10000,
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
