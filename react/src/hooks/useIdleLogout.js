"use client";

import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

export function useIdleLogout(onLogout, timeout = 60 * 60 * 1000) {
  // 1h mặc định
  const timerRef = useRef(null);

  const logout = async () => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API}/api/logout`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout API failed:", error);
      }
    }

    // Xóa cookie access_token
    Cookies.remove("access_token");
    onLogout();
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      logout();
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // bắt đầu đếm

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);
}
