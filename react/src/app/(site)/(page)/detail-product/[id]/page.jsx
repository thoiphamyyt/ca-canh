"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import ZoomImage from "@/components/image/zoomImage";
import ProductRelated from "@/app/(site)/(page)/detail-product/[id]/product-related";
import { fetchDetailProduct } from "@/lib/fetchProduct";
import { formatVND } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/cartContext";
import ReviewProduct from "./reivewProduct";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [dataDetail, setDataDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    async function getDetail() {
      try {
        const data = await fetchDetailProduct(id);
        setDataDetail(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    getDetail();
  }, [id]);

  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const increase = () =>
    setQuantity((prev) => (dataDetail.quantity > prev ? prev + 1 : prev));

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value === "" ? "" : parseInt(value, 10));
    }
  };
  const handleBlurQuantity = () => {
    if (!quantity || quantity < 1) setQuantity(1);
  };

  useEffect(() => {
    if (dataDetail.images_url?.length > 0) {
      setMainImage(dataDetail.images_url[0]);
    }
  }, [dataDetail]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-gray-700 dark:text-gray-200">
        <div className="flex items-center justify-center my-8">
          <div className="flex-1 border-t border-gray-400 dark:border-gray-700"></div>
          <h2 className="mx-4 text-2xl md:text-3xl font-bold text-center tracking-wide">
            Đang tải thông tin sản phẩm...
          </h2>
          <div className="flex-1 border-t border-gray-400 dark:border-gray-700"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="w-full h-[400px] rounded-xl" />
            <div className="flex gap-3">
              <Skeleton className="h-[100px] w-1/3 rounded-md" />
              <Skeleton className="h-[100px] w-1/3 rounded-md" />
              <Skeleton className="h-[100px] w-1/3 rounded-md" />
            </div>
            <Separator className="my-6" />
            <div>
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <Skeleton className="h-10 w-2/3 rounded-md" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Separator className="my-6" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-40 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="flex items-center justify-center my-8">
        <div className="flex-1 border-t border-gray-400 dark:border-gray-700"></div>
        <h2 className="mx-4 text-2xl md:text-3xl font-bold text-center relative">
          THÔNG TIN CHI TIẾT
          <span className="absolute left-1/2 -bottom-3 w-16 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-md transform -translate-x-1/2"></span>
        </h2>
        <div className="flex-1 border-t border-gray-400 dark:border-gray-700"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start md:items-center">
              <div className="md:col-span-2">
                <ZoomImage
                  src={mainImage || "/images/product/product-default.png"}
                  alt={dataDetail.product}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-4 items-center">
                {dataDetail.images_url?.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(src)}
                    className={`rounded-lg overflow-hidden border transition flex items-center justify-center w-28 h-24 ${
                      mainImage === src
                        ? "border-sky-500 dark:border-sky-400 shadow-md"
                        : "border-gray-300 dark:border-gray-700 hover:border-sky-400"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${dataDetail.product} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Separator className="my-6 dark:bg-gray-700" />

          <Tabs defaultValue="description">
            <TabsList className="bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-500"
              >
                Mô tả
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-500"
              >
                Đánh giá
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <div className="leading-relaxed text-gray-600 dark:text-gray-300">
                {dataDetail.description &&
                typeof dataDetail.description === "string" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: dataDetail.description }}
                  />
                ) : (
                  dataDetail.description || dataDetail.describe
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <ReviewProduct idProduct={id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-4">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl font-bold text-sky-700 dark:text-sky-400">
              {dataDetail.product}
            </h1>

            <div className="grid grid-cols-2 gap-5 py-3 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="text-sm font-medium">Số lượng</h4>
                <p className="mt-1">#{dataDetail.quantity}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Mã sản phẩm</h4>
                <p className="mt-1">#{dataDetail.id}</p>
              </div>
            </div>

            <Separator className="my-6 dark:bg-gray-700" />

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">{dataDetail.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({dataDetail.review_count} đánh giá)
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-emerald-600 to-sky-500 text-white">
                Miễn phí giao hàng
              </Badge>
            </div>

            <div className="mt-4 flex items-baseline gap-4">
              <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                {formatVND(dataDetail.price)}
              </div>
              {dataDetail.old_price && (
                <div className="text-sm line-through text-gray-500 dark:text-gray-400">
                  {formatVND(dataDetail.old_price)}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 py-4">
              <span className="font-medium">Số lượng</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  onClick={decrease}
                  className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </Button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  onBlur={handleBlurQuantity}
                  className="w-12 text-center bg-transparent border-x border-gray-300 dark:border-gray-600 outline-none"
                />
                <Button
                  variant="ghost"
                  onClick={increase}
                  className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="mt-2 flex gap-3">
              <Button
                onClick={() => addToCart(dataDetail, quantity)}
                className="flex-[7] bg-gradient-to-r from-emerald-600 to-sky-500 hover:opacity-90 text-white"
              >
                Thêm vào giỏ
              </Button>
              <Button
                variant="ghost"
                className="flex-[3] bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 text-white"
              >
                Mua ngay
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <ProductRelated id_category={dataDetail.id_category} />
    </div>
  );
}
