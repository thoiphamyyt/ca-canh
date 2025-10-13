"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/lib/fetchProduct";
import MenuLeft from "@/layout/user/Menu";
import { formatVND } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CartDialog from "@/components/cart/cartDialog";
import PaginationPage from "@/components/common/PaginationPage";
import { renderStars } from "@/lib/utils";

export default function ProductList() {
  const [products, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || null;
  const product = searchParams.get("product") || null;

  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await fetchProduct({
          id_category: category ?? "",
          product: product ?? "",
          page,
          limit: perPage,
        });
        setProduct(data.data ?? []);
        setTotal(data.total ?? 0);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [category, product, page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <section className="container mx-auto py-12 px-4 md:px-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MenuLeft
          onCategoryChange={(id) => {
            setIdCategory(id);
            setPage(1);
          }}
        />

        {loading ? (
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={index}
                className="p-4 h-[500px] flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 animate-pulse"
              >
                <Skeleton className="w-full h-[210px] rounded-md" />
                <Skeleton className="mt-4 h-4 w-24 mx-auto" />
                <div className="flex justify-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
                <Skeleton className="mt-3 h-5 w-3/4 mx-auto" />
                <div className="flex justify-center gap-3 mt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </Card>
            ))}
          </div>
        ) : products && products.length ? (
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((item) => (
                <Card
                  key={item.id}
                  className="group relative p-4 text-center bg-white dark:bg-[#0b1e2b] border border-sky-100 dark:border-sky-900 hover:shadow-lg hover:shadow-sky-100 dark:hover:shadow-sky-800 transition h-[500px] rounded-xl"
                >
                  <div className="bg-sky-50 dark:bg-sky-950 rounded-md overflow-hidden relative">
                    <Image
                      src={
                        item.images_url && item.images_url.length
                          ? item.images_url[0]
                          : "/images/product/product-default.png"
                      }
                      unoptimized
                      alt={item.product}
                      width={150}
                      height={150}
                      className="mx-auto w-full h-[210px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <CartDialog dataProduct={item} />
                      <Link href={`/detail-product/${item.id}`}>
                        <button className="p-3 rounded-full shadow-md bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-600 text-white transition">
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="text-lg flex flex-col gap-3 mt-4">
                    <p className="text-sky-600 dark:text-sky-300 mt-2">
                      {item.category}
                    </p>

                    <div className="flex justify-center text-yellow-400">
                      {renderStars(Math.round(item.rating || 0))}
                    </div>

                    <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">
                      {item.product}
                    </h4>

                    <p className="mt-1">
                      <span className="text-orange-500 dark:text-orange-400 font-bold">
                        {formatVND(item.price)}
                      </span>
                      {item.old_price && (
                        <span className="line-through text-gray-400 dark:text-gray-500 text-sm ml-3">
                          {formatVND(item.old_price)}
                        </span>
                      )}
                    </p>

                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {item.describe || item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <PaginationPage
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        ) : (
          <div className="md:col-span-3 text-center text-xl text-gray-600 dark:text-gray-300">
            Chưa tìm thấy sản phẩm nào phù hợp 🐠
          </div>
        )}
      </div>
    </section>
  );
}
