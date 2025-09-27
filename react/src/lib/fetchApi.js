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

    return data && data.success ? data.data : [];
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

    return data && data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
export { fetchNews, detailNews, newsBySlug, fetchOrder };
