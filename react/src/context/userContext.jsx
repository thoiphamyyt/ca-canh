"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "@/lib/fetchUser";

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
        setLoading(false); // ✅ luôn set false khi xong
      }
    }
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_expiry");
    setUser(null); // ✅ clear user trong context
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

export default UserProvider; // ✅ export default
