import config from "@/config";

const fetchNews = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/news?${queryString}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        params: params,
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data ?? null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const newsBySlug = async (slug) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-news-by-slug/${slug}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data && data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

const detailNews = async (slug) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-news/${slug}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data && data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const fetchOrder = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/orders?${queryString}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const fetchOrderManager = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/orders-manager?${queryString}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const detailOrderManager = async (id) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/orders-detail/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const changeStatusOrders = async (id, status) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/orders-change-status/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const fetchProductReviews = async (productId, page = 1) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/products/${productId}/reviews?page=${page}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product reviews");
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const postProductReview = async (productId, payload) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/products/${productId}/reviews`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

const statisticalCustomer = async () => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/statistical-customer`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
};

const statisticalMonth = async () => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/statistical-month`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
};

const fetchContacts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/contacts?${queryString}`,
      {
        method: "GET",
        credentials: "include",

        headers: {
          Accept: "application/json",
        },
        params: params,
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const data = await res.json();

    return data ?? null;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export {
  fetchNews,
  detailNews,
  newsBySlug,
  fetchOrder,
  fetchOrderManager,
  detailOrderManager,
  changeStatusOrders,
  fetchProductReviews,
  postProductReview,
  statisticalCustomer,
  statisticalMonth,
  fetchContacts,
};
