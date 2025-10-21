import Cookies from "js-cookie";
import config from "@/config";
const fetchUser = async () => {
  if (typeof window === "undefined") return null;

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
    return data && data.success ? data.user : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const fetchCustomer = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/list-customer?${queryString}`,
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
    return data && data.success ? data.data : [];
  } catch (error) {
    console.error("Không thể lấy dữ liệu", error);
    return null;
  }
};

export { fetchUser, fetchCustomer };
