"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchNews } from "@/lib/fetchApi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export default function ItemList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // responsive slidesToShow
  const getSlidesToShow = () =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  useEffect(() => {
    const onResize = () => setSlidesToShow(window.innerWidth >= 768 ? 3 : 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchNews({ status: "published" });
        if (!mounted) return;
        setNews(data || []);
      } catch (e) {
        console.error("fetchNews error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        📖 Bài viết nổi bật
      </h2>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card
              key={idx}
              className="overflow-hidden rounded-2xl shadow-md dark:shadow-slate-800"
            >
              <Skeleton className="h-48 w-full rounded-t-2xl" />
              <CardHeader className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-10 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-slate-500">Không có bài viết</div>
      ) : (
        <NewsSlider news={news} slidesToShow={slidesToShow} />
      )}
    </section>
  );
}
function NewsSlider({ news, slidesToShow }) {
  const originalCount = news.length;
  const shouldLoop = originalCount > slidesToShow;

  //tạo autoplay plugin tự động chạy qua từng item sau 4s
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: shouldLoop, // check đủ item thì bậc loop
      align: "start",
      containScroll: "trimSnaps", // không để thừa khoảng trống ở cuối danh sách
    },
    [autoplay.current]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();

    const onSelect = () => {
      const sel = emblaApi.selectedScrollSnap();
    };

    emblaApi.on("select", onSelect);

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, originalCount, shouldLoop]);

  const handlePrev = () => emblaApi && emblaApi.scrollPrev();
  const handleNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex h-[550px] md:h-[420px]">
            {news.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3 box-border"
              >
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col rounded-2xl overflow-hidden shadow-md group bg-white dark:bg-slate-800">
                    <div className="relative h-48 md:h-44 w-full overflow-hidden">
                      <img
                        src={
                          item.images_url && item.images_url.length
                            ? item.images_url[0]
                            : "/images/product/product-default.png"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      {/* Title overlay */}
                      <h3
                        className="absolute bottom-4 left-4 right-4 text-lg md:text-xl font-bold 
                 text-white drop-shadow-2xl leading-snug
                 line-clamp-2 group-hover:line-clamp-none transition-all duration-300"
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <CardHeader className="mt-2 px-4 flex-grow overflow-hidden">
                      <CardDescription className="line-clamp-4 text-slate-700 dark:text-slate-300">
                        <div className="prose max-w-none dark:prose-invert text-justify">
                          {item.description || item.content || ""}
                        </div>
                      </CardDescription>
                    </CardHeader>

                    {/* Button */}
                    <CardContent className="px-4 pb-4 mt-auto">
                      <Link href={item.slug || "#"} className="block">
                        <Button className="w-full rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-transform hover:scale-105">
                          Xem chi tiết
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePrev}
          aria-label="Prev"
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur z-10"
          style={{ transform: "translateY(-50%)" }}
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          aria-label="Next"
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur z-10"
        >
          ›
        </button>
      </div>
    </>
  );
}
