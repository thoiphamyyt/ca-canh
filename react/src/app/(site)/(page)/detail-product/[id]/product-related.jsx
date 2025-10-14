"use client";
import { fetchProduct } from "@/lib/fetchProduct";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { formatVND } from "@/lib/utils";
import CartDialog from "@/components/cart/cartDialog";
import { renderStars } from "@/lib/utils";

export default function ProductRelated({ id_category }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await fetchProduct({ id_category });
        setProduct(data.data ?? []);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    }
    getProduct();
  }, [id_category]);

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
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide relative text-sky-800 dark:text-sky-300">
          Sản phẩm tương tự
          <span className="absolute left-0 -bottom-3 w-[60px] h-1 bg-sky-600 dark:bg-sky-400 rounded-md"></span>
        </h2>

        <div className="overflow-hidden mt-8" ref={emblaRef}>
          <div className="flex">
            {product.map((item) => (
              <div
                key={item.id}
                className="shrink-0 flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_25%] px-2"
              >
                <div className="rounded-xl px-2 py-9 justify-between h-full flex">
                  <Card className="group relative p-4 text-center bg-white dark:bg-[#0b1e2b] hover:shadow-lg dark:hover:shadow-sky-900 transition h-[500px] border border-sky-100 dark:border-sky-800">
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
                          <button className="p-3 rounded-full shadow-md bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-600">
                            <Eye className="w-5 h-5 text-white" />
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

                      <div className="mt-1 text-base line-clamp-3 text-gray-700 dark:text-gray-300">
                        {item.describe ? (
                          <div>{item.describe}</div>
                        ) : typeof item.description === "string" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        ) : (
                          item.description
                        )}
                      </div>
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
