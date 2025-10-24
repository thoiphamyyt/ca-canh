"use client";
import { fetchProduct } from "@/lib/fetchProduct";
import { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await fetchProduct({
        limit: 6,
        product: textSearch,
      });
      setProducts(data.data ?? []);
    } catch (err) {
      console.error("Không thể tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleSearch = () => {
    loadProduct();
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold dark:text-white text-sky-800">
          Sản phẩm nổi bật
        </h2>
        <div className="hidden sm:flex items-center gap-4">
          <Input
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-64 dark:bg-slate-800"
          />
          <Button variant="outline" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, idx) => (
            <Card className="overflow-hidden shadow-md rounded-xl" key={idx}>
              <div className="relative h-40 w-full">
                <Skeleton className="h-full w-full" />
              </div>

              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>

                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-9 w-24 rounded-lg" />
                  <Skeleton className="h-9 w-20 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : products.length ? (
          products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))
        ) : (
          <div className="center">Không tìm thấy sản phẩm ...</div>
        )}
      </div>
    </section>
  );
}
