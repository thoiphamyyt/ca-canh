"use client";
import { fetchProduct } from "@/lib/fetchProduct";
import { useEffect, useState } from "react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { formatVND } from "@/lib/utils";

export default function ProducRelated(params) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function getProduct() {
      try {
        const data = await fetchProduct();
        setProduct(data);
      } catch {
        console.error("Failed to fetch category:", error);
      }
    }
    getProduct();
  }, []);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay()]
  );

  return (
    product && (
      <section className="container mx-auto py-12">
        <h2 className="text-2xl md:text-3xl font-bold dark:text-white tracking-wide relative">
          Sản phẩm tương tự
          <span className="absolute left-0 -bottom-3 w-[50px] h-1 bg-lime-700 dark:bg-lime-400 rounded-md"></span>
        </h2>
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Track */}
          <div className="flex">
            {product.map((item, i) => (
              <div
                key={item.id}
                className="shrink-0 flex-[0_0_100%] md:flex-[0_0_50%]  xl:flex-[0_0_25%] px-2" // spacing nằm ngoài snap
              >
                <div className="rounded-xl px-2 py-9 justify-between h-full flex">
                  <Card
                    key={item.id}
                    className="group relative p-4 text-center hover:shadow-lg transition h-[500px]"
                  >
                    <div className="bg-gray-100 p-4 rounded-md overflow-hidden">
                      <Image
                        src={"/image/product/product-default.png"}
                        unoptimized
                        alt={item.product}
                        width={150}
                        height={150}
                        className="mx-auto w-[190px] h-[210px] object-cover transition-transform duration-500 ease-out hover:scale-110"
                      />

                      {/* Hover Action Icons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <button className="p-3 rounded-full bg-lime-400 hover:bg-green-500 shadow-md dark:bg-green-600 dark:hover:bg-green-900">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </button>
                        <Link href={"/detail-product"}>
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
                              i < Math.floor(item.rating)
                                ? "fill-yellow-400"
                                : ""
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
                          {item.oldPrice ? formatVND(item.oldPrice) : ""}
                        </span>
                      </p>
                      <p className="mt-1 text-base line-clamp-3">
                        {" "}
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}
