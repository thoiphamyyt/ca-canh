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
    color: "bg-blue-100",
    highlightColor: "text-blue-600",
    cta: "Khám Phá Ngay",
  },
  {
    heading: "Hồ Cá Hiện Đại",
    highlight: "Phụ Kiện",
    desc: "Máy lọc, hệ thống oxy, đèn trang trí và hồ kính – đầy đủ để tạo nên không gian thủy sinh sống động.",
    img: "/images/image-baner2.jpg",
    color: "bg-teal-100",
    highlightColor: "text-teal-600",
    cta: "Mua Ngay",
  },
  {
    heading: "Dinh Dưỡng Cho Cá",
    highlight: "Thức Ăn",
    desc: "Nguồn thức ăn giàu dinh dưỡng giúp cá cảnh khỏe mạnh, phát triển tự nhiên và lên màu đẹp.",
    img: "/images/image-baner3.jpg",
    color: "bg-green-100",
    highlightColor: "text-green-600",
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
    <section className="relative">
      {/* Slider */}
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((item, index) => (
            <div
              key={index}
              className={`${item.color} flex-[0_0_100%] h-[550px] flex flex-col-reverse lg:flex-row items-center gap-8 px-4 lg:px-12`}
            >
              {/* Left Text */}
              <div className="flex-1 text-center lg:text-left animate-fall-down">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  <span className={item.highlightColor}>{item.highlight}</span>{" "}
                  {item.heading}
                </h1>
                <p className="mt-4 text-gray-700 max-w-lg mx-auto lg:mx-0 text-lg">
                  {item.desc}
                </p>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-green-800 hover:bg-green-700 text-white rounded-full px-8 shadow-lg"
                  >
                    {item.cta}
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex-1 flex justify-center">
                <Card className="shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={item.img}
                      alt={`${item.highlight} ${item.heading}`}
                      width={500}
                      height={500}
                      className="object-cover"
                      priority
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 flex space-x-2 bottom-[70px]">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === selectedIndex
                ? "bg-green-900 border-green-900 scale-110"
                : "border-green-900 hover:bg-green-300"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
