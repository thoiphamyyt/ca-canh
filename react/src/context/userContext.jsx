"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "@/lib/fetchUser";
import config from "@/config";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const logout = async () => {
    try {
      // gọi API Laravel để xoá cookie access_token
      await fetch(`${config.NEXT_PUBLIC_API}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };
  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default UserProvider;
