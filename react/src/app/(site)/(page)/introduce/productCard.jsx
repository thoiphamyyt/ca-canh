"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { formatVND } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import CartDialog from "@/components/cart/cartDialog";

export default function ProductCard({ product, addToCart }) {
  return (
    <Card className="overflow-hidden dark:bg-slate-800 shadow-md hover:shadow-lg transition">
      <div className="relative h-56 w-full">
        <Image
          src={
            product.images_url?.length
              ? product.images_url[0]
              : "/images/product/product-default.png"
          }
          alt={product.product}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-lg dark:text-white text-sky-800">
              {product.product}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-3">
              {product.description}
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200">
            {product.tag}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400"
                    : "text-gray-300 dark:text-slate-600"
                }`}
              />
            ))}
          </div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {formatVND(product.price)}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <CartDialog
            dataProduct={product}
            trigger={
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Thêm vào giỏ
              </Button>
            }
          />
          <Link href={`/detail-product/${product.id}`}>
            <Button
              className="border border-slate-300 text-slate-700 dark:text-slate-200 dark:border-slate-600"
              variant="ghost"
              size="sm"
            >
              Chi tiết
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
