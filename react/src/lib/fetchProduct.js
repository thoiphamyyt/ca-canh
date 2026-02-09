import config from "@/config";

const fetchProduct = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/products?${queryString}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        params: params,
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();
    return data ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const fetchDetailProduct = async (slug) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-product-by-slug/${slug}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();
    return data && data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const fetchCategory = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/category?${queryString}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        params: params,
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }
    console.log("fetchCategory called at:", new Date().toISOString());

    const data = await res.json();
    return data && data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export { fetchCategory, fetchProduct, fetchDetailProduct };
