"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  {
    heading: "Cao Cấp - Đa Dạng Chủng Loại",
    highlight: "Cá Cảnh",
    desc: "Mang cả đại dương thu nhỏ vào ngôi nhà bạn với những giống cá cảnh độc đáo, đầy màu sắc và phong thủy.",
    img: "/images/image-baner.jpg",
    color:
      "bg-blue-100 dark:bg-gradient-to-r dark:from-sky-950 dark:to-blue-900",
    highlightColor: "text-blue-700 dark:text-sky-300",
    cta: "Khám Phá Ngay",
  },
  {
    heading: "Hồ Cá Hiện Đại",
    highlight: "Phụ Kiện",
    desc: "Máy lọc, hệ thống oxy, đèn trang trí và hồ kính – đầy đủ để tạo nên không gian thủy sinh sống động.",
    img: "/images/image-baner2.jpg",
    color:
      "bg-teal-100 dark:bg-gradient-to-r dark:from-teal-950 dark:to-emerald-900",
    highlightColor: "text-teal-700 dark:text-teal-300",
    cta: "Mua Ngay",
  },
  {
    heading: "Dinh Dưỡng Cho Cá",
    highlight: "Thức Ăn",
    desc: "Nguồn thức ăn giàu dinh dưỡng giúp cá cảnh khỏe mạnh, phát triển tự nhiên và lên màu đẹp.",
    img: "/images/image-baner3.jpg",
    color:
      "bg-green-100 dark:bg-gradient-to-r dark:from-green-950 dark:to-emerald-900",
    highlightColor: "text-green-700 dark:text-emerald-300",
    cta: "Xem Sản Phẩm",
  },
];

export default function HeroSlider() {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden transition-colors">
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((item, index) => (
            <div
              key={index}
              className={`${item.color} flex-[0_0_100%] h-[550px] flex flex-col-reverse lg:flex-row items-center gap-8 px-4 lg:px-12`}
            >
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                  <span className={item.highlightColor}>{item.highlight}</span>{" "}
                  {item.heading}
                </h1>
                <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 text-lg">
                  {item.desc}
                </p>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 dark:from-emerald-600 dark:to-teal-500 dark:hover:from-emerald-500 dark:hover:to-teal-400 text-white rounded-full px-8 shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    {item.cta}
                  </Button>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <Card className="shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-transform duration-500 hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <Image
                      src={item.img}
                      alt={`${item.highlight} ${item.heading}`}
                      width={500}
                      height={500}
                      className="object-cover h-[400px] w-full"
                      priority
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex space-x-2 bottom-[60px]">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === selectedIndex
                ? "bg-green-600 border-green-600 dark:bg-emerald-400 dark:border-emerald-400 scale-125 shadow-lg"
                : "border-green-600 dark:border-emerald-400 hover:bg-green-300 dark:hover:bg-emerald-600/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
