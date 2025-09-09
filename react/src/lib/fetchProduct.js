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
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();
    return data ? data.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const fetchDetailProduct = async (id) => {
  try {
    const res = await fetch(
      `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-product/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();
    return data ? data.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const fetchCategory = async (params = {}) => {
  try {
    const res = await fetch(`${config.NEXT_PUBLIC_API}/api/ca-canh/category`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      params: params,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    const data = await res.json();
    return data ? data.data : null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export { fetchCategory, fetchProduct, fetchDetailProduct };
