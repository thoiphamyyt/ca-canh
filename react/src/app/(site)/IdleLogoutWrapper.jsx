"use client";

import { useRouter } from "next/navigation";
import { useIdleLogout } from "hooks/useIdleLogout";

export default function IdleLogoutWrapper() {
  const router = useRouter();

  useIdleLogout(() => {
    router.push("/login");
  });

  return null;
}
