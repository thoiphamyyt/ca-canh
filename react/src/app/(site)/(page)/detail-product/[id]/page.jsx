"use client";
import React, { useEffect, useState, use } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import ZoomImage from "@/components/image/zoomImage";
import ProductRelated from "@/app/(site)/(page)/detail-product/[id]/product-related";
import Image from "next/image";
import { fetchDetailProduct } from "@/lib/fetchProduct";
import { formatVND } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/cartContext";
import { link_public_api } from "@/lib/contants";

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [dataDetail, setDataDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getDetail() {
      try {
        const data = await fetchDetailProduct(id);
        setDataDetail(data);
      } catch {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    getDetail();
  }, []);

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleBlurQuantity = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1);
    }
  };

  return loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-7xl mx-auto">
      {/* Cột trái - ảnh */}
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-[100px] w-1/3 rounded-md" />
          <Skeleton className="h-[100px] w-1/3 rounded-md" />
          <Skeleton className="h-[100px] w-1/3 rounded-md" />
        </div>
      </div>

      {/* Cột phải - thông tin */}
      <div className="space-y-4">
        <Skeleton className="h-[100px] w-2/3" />
        <Skeleton className="h-[50px] w-1/2" />
        <Skeleton className="h-[350px] w-2/3 rounded-lg" />
      </div>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-center my-8">
        <div className="flex-1 border-t border-gray-600"></div>
        <h2 className="mx-4 text-2xl md:text-3xl font-bold text-center dark:text-white tracking-wide relative">
          THÔNG TIN CHI TIẾT
          <span className="absolute left-1/2 -bottom-3 w-16 h-1 dark:bg-lime-400 bg-lime-700 rounded-md transform -translate-x-1/2"></span>
        </h2>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: images */}
        <div className="lg:col-span-6">
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start md:items-center">
              <div className="md:col-span-2">
                {/* Main image */}
                <ZoomImage
                  src={
                    dataDetail.image
                      ? `${link_public_api}/${dataDetail.image[0]}`
                      : "/images/product/product-default.png"
                  }
                  alt={dataDetail.product}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex flex-col gap-y-4 items-center">
                {dataDetail.image &&
                  dataDetail.image.map((src, i) => (
                    <button
                      key={i}
                      className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition flex items-center justify-center w-28 h-24"
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img
                        src={`${link_public_api}/${src}`}
                        alt={`${dataDetail.product} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            </div>
          </Card>

          {/* Small gallery or related cards */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <img
              src="/images/product/product1.jpg"
              alt="thumb"
              className="w-full h-24 object-cover rounded-md"
            />
            <img
              src="/images/product/product2.jpg"
              alt="thumb"
              className="w-full h-24 object-cover rounded-md"
            />
            <img
              src="/images/product/product3.jpg"
              alt="thumb"
              className="w-full h-24 object-cover rounded-md"
            />
          </div>

          <Separator className="my-6" />
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Mô tả</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="leading-relaxed text-muted-foreground">
                {dataDetail.description}
              </p>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/user-default.jpg"
                        width={20}
                        height={20}
                        alt="user evaluate"
                        className="w-10 h-10 rounded-full"
                      ></Image>
                      <div>
                        <div className="font-medium">Nguyễn A</div>
                        <div className="text-sm text-muted-foreground">
                          2 ngày trước
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">5.0</span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Sản phẩm đẹp, giao nhanh. Rất hài lòng!
                  </p>
                </div>

                <Button variant="ghost">Xem thêm đánh giá</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: details */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <Card className="p-6">
            <CardHeader className="p-[none]">
              <h1 className="text-4xl font-bold text-green-900 dark:text-green-500">
                {dataDetail.product}
              </h1>
              <div className="grid grid-cols-2 gap-5 py-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Số lượng
                  </h4>
                  <p className="mt-1">#{dataDetail.quantity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Mã sản phẩm
                  </h4>
                  <p className="mt-1">#{dataDetail.id}</p>
                </div>
              </div>
            </CardHeader>
            <Separator className="my-6" />

            <CardContent className="p-0 mt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{dataDetail.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    (30 đánh giá)
                  </span>
                </div>
                <Badge>Miễn phí giao hàng</Badge>
              </div>

              <div className="mt-4 flex items-baseline gap-4">
                <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                  {formatVND(dataDetail.price)}
                </div>
                {dataDetail.old_price && (
                  <div className="text-sm line-through text-muted-foreground">
                    {formatVND(dataDetail.old_price)}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 py-4">
                <span className="font-medium">Số lượng</span>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <Button variant="ghost" onClick={decrease} className="px-3">
                    -
                  </Button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    onBlur={handleBlurQuantity}
                    className="w-12 text-center outline-none border-x"
                  />
                  <Button variant="ghost" onClick={increase} className="px-3">
                    +
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex gap-3">
                <Button
                  onClick={() => addToCart(dataDetail, quantity)}
                  className="flex-[7] bg-green-600 dark:bg-green-300 dark:hover:bg-white"
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  variant="ghost"
                  className="flex-[3] hover:bg-yellow-500 bg-gray-200 dark:text-black"
                >
                  Mua ngay
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ProductRelated id_category={dataDetail.id_category} />
    </div>
  );
}
