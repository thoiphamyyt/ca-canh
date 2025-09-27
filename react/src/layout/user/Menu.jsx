"use client";
import { fetchCategory } from "@/lib/fetchProduct";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
const MenuLeft = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await fetchCategory();
        setCategory(data);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategory();
  }, []);
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveId(parseInt(categoryParam));
    } else {
      setActiveId("all");
    }
  }, [searchParams]);
  const handleClick = (id) => {
    setActiveId(id);
    const params = new URLSearchParams(searchParams);
    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    router.push("/product?" + params.toString());
  };

  return (
    <>
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-full flex justify-between items-center p-3 border rounded-md"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {[{ name: "Tất cả", id: "all" }, ...category].map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.id)}
              className={`w-full flex justify-between items-center p-3 border rounded-md hover:bg-green-200 ${
                item.id === activeId
                  ? "text-green-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {item.name} <span>→</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
export default MenuLeft;
