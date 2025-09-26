"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/lib/fetchProduct";
import MenuLeft from "@/layout/user/Menu";
import CartDialog from "@/components/cart/cartDialog";
import { formatVND } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function ProductList() {
  const [products, setProduct] = useState(null);
  const [idCategory, setIdCategory] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProduct({ id_category: idCategory });
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false); // ✅ luôn set false khi xong
      }
    }
    loadProduct();
  }, [idCategory]);
  return (
    <section className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Danh mục sản phẩm</h2>
        <p className="text-gray-500 mt-2">
          Chúng tôi đem đến cho bạn những sản phẩm tốt nhất, mới nhất và đa dạng
          nhất. Với nhiều loại cá đẹp, độc lạ, bạn sẽ tìm thấy những người bạn
          tuyệt vời cho bể cá của mình.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MenuLeft onCategoryChange={setIdCategory} />

        {/* Products */}
        {loading ? (
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={index}
                className="p-4 h-[500px] flex flex-col animate-pulse"
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
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((item) => (
              <Card
                key={item.id}
                className="group relative p-4 text-center hover:shadow-lg transition h-[500px]"
              >
                <div className="bg-gray-100 rounded-md overflow-hidden">
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
                    className="mx-auto w-full h-[210px] object-cover transition-transform duration-500 ease-out hover:scale-110"
                  />

                  {/* Hover Action Icons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <CartDialog dataProduct={item} />
                    <Link href={`/detail-product/${item.id}`}>
                      <button className="p-3 rounded-full shadow-md bg-yellow-300 hover:bg-yellow-500 dark:bg-amber-600 dark:hover:bg-orange-700">
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="text-lg flex flex-col gap-3 mt-4">
                  <p className="text-gray-500 mt-2">{item.category}</p>
                  <div className="flex justify-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating) ? "fill-yellow-400" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="mt-2 font-semibold">{item.product}</h4>
                  <p className="mt-1">
                    <span className="text-green-600 font-bold">
                      {formatVND(item.price)}
                    </span>
                    <span className="line-through text-gray-400 text-sm ml-3">
                      {item.old_price ? formatVND(item.old_price) : ""}
                    </span>
                  </p>
                  <p className="mt-1 text-base line-clamp-3">
                    {" "}
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl">
            Chưa tìm thấy sản phẩm nào phù hơp
          </div>
        )}
      </div>
    </section>
  );
}
