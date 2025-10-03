"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/lib/fetchProduct";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import CartDialog from "@/components/cart/cartDialog";

export default function Content() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProduct({ limit: 1 });
        setProduct(data.data && data.data.length ? data.data[0] : null);
      } catch {
        console.error("no data");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, []);

  return (
    <section className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-10">
      <div className="flex-1">
        {loading ? (
          <div className="skeleton-wrapper">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-11 w-3/4" />
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-2/3 mt-2" />

            <div className="mt-6 flex gap-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Badge className="mb-4">Cửa hàng cá cảnh</Badge>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight dark:text-white text-sky-800">
              Thế giới cá cảnh rực rỡ cho bể nhà bạn
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Chúng tôi cung cấp các loại cá cảnh tuyển chọn, từ cá Koi, Betta
              đến cá Neon và Guppy. Bảo hành sức khỏe cá và tư vấn chăm sóc miễn
              phí.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Khám phá sản phẩm</Button>
              <Button variant="outline">Đặt tư vấn chăm sóc</Button>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
              <Stat label="Loài cá" value="50+" />
              <Stat label="Khách hàng" value="5k+" />
              <Stat label="Giao hàng" value="Toàn quốc" />
            </div>
          </>
        )}
      </div>

      <motion.div
        className="flex-1 max-w-xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {loading ? (
          <Card className="overflow-hidden shadow-xl ">
            <Skeleton className="h-80 w-full" />
            <CardContent className="space-y-4 mt-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20 rounded-lg" />
                  <Skeleton className="h-9 w-20 rounded-lg" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="group overflow-hidden rounded-2xl shadow-lg dark:bg-slate-800 transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={
                  product.images_url?.length
                    ? product.images_url[0]
                    : "/images/product/product-default.png"
                }
                alt={product.product || "Sản phẩm cá cảnh"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Badge className="absolute top-3 left-3 bg-pink-500 text-white shadow-md">
                Hot
              </Badge>
            </div>

            <CardContent className="p-5">
              <h3 className="text-xl font-semibold line-clamp-1 dark:text-white text-sky-800">
                {product.product}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-400">Giá chỉ: {""} </span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {formatVND(product.price)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <CartDialog
                    trigger={
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        Mua ngay
                      </Button>
                    }
                    dataProduct={product}
                  />

                  <Link href={`/detail-product/${product.id}`}>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="font-semibold text-lg dark:text-white text-sky-800">
        {value}
      </span>
    </div>
  );
}
