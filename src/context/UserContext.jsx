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
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${api_url}/create/session`, {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [api_url]);

  const signup = async (userData) => {
    const res = await axios.post(`${api_url}/create/signup`, userData, {
      withCredentials: true,
    });

    setUser(res.data.user);
  };

  const login = (userData) => {
    setUser(userData);
  };
  const logout = async () => {
    await axios.post(`${api_url}/create/logout`, null, {
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
