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
    return data ? data.data : [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export { fetchNews };
