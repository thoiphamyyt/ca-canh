import Cookies from "js-cookie";
import config from "@/config";
const fetchUser = async () => {
  if (typeof window === "undefined") return null; // tránh chạy ở server

  try {
    const res = await fetch(`${config.NEXT_PUBLIC_API}/api/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    if (res.status === 401) {
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
};

const fetchCustomer = async () => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/list-customer`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (res.status === 401) {
      return null;
    }
    if (!res.ok || res.status === 403) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    return data ? data.data : [];
  } catch (error) {
    console.error("Không thể lấy dữ liệu", error);
    return null;
  }
};

export { fetchUser, fetchCustomer };
