"use client";
import { useEffect, useState, UserContext} from "react";
import { fetchUser } from "@/lib/fetchUser";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const data = await fetchUser();
      setUser(data);
    }
    loadUser();
  }, []);

  // Gói children và truyền user qua context hoặc props
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
