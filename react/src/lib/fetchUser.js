import Cookies from "js-cookie";
export async function fetchUser() {
  if (typeof window === "undefined") return null; // tránh chạy ở server
  const token = Cookies.get("access_token");

  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      // Token sai hoặc hết hạn
      return null;
    }
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    return data ? data.user : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
