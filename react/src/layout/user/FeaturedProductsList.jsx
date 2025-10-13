"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { formatVND, renderStars } from "@/lib/utils";
import { fetchProduct } from "@/lib/fetchProduct";
import Link from "next/link";

export default function FeaturedProductsList({ title = "Sản phẩm nổi bật" }) {
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await fetchProduct({
          page,
          limit: perPage,
          sortField: "rating",
          sortOrder: "desc",
        });
        setProduct(data.data || []);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [page]);

  const skeletonArray = Array.from({ length: perPage });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 transition-colors duration-300">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-sky-600 dark:text-slate-100">
            {title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Lựa chọn đặc biệt được yêu thích nhất tại CaCanhTV
          </p>
        </div>
        <Link href="/product">
          <Button
            variant="outline"
            size="sm"
            className="border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-slate-800/50"
          >
            Xem tất cả
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? skeletonArray.map((_, i) => (
              <Card
                key={i}
                className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5"
              >
                <Skeleton className="h-56 w-full mb-4 rounded-xl" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/3 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-full rounded-md" />
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
              </Card>
            ))
          : products.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-sky-300 dark:hover:border-sky-500 transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      alt={item.product}
                      src={
                        item.images_url
                          ? item.images_url[0]
                          : "/images/product/product-default.png"
                      }
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/80 dark:bg-sky-900/70 dark:text-sky-200 backdrop-blur-sm"
                      >
                        {item.category_name ?? "Khác"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {item.product}
                    </h3>

                    <div className="flex items-center gap-1 text-sm">
                      <div className="flex">
                        {renderStars(Math.round(item.rating || 0))}
                      </div>
                    </div>

                    <div className="text-sky-600 dark:text-sky-400 font-bold mt-1">
                      {formatVND(item.price)}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Button className="flex-1 bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-400 transition-colors">
                        Thêm vào giỏ
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-sky-900/40"
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>
    </section>
  );
}
