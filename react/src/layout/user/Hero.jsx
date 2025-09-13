"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Fresh & Organic Vegetables",
    highlight: "Vegetables",
    desc: "Get fresh groceries delivered to your door. Healthy, organic and natural products just a click away.",
    img: "/images/image-baner.jpg",
    color: "bg-green-100",
  },
  {
    title: "Farm Fresh Fruits",
    highlight: "Fruits",
    desc: "Juicy, sweet, and full of vitamins. Order fresh fruits straight from local farms.",
    img: "/images/image-baner2.jpg",
    color: "bg-customBeige",
  },
  {
    title: "Healthy Organic Foods",
    highlight: "Foods",
    desc: "Eat clean, live better with our range of organic foods, carefully sourced for you.",
    img: "/images/image-baner3.jpg",
    color: "bg-cyan-100",
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

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

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
                  {item.title.replace(item.highlight, "")}
                  <span className="text-green-600">{item.highlight}</span> For
                  You
                </h1>
                <p className="mt-4 text-gray-600 max-w-lg mx-auto lg:mx-0">
                  {item.desc}
                </p>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Shop Now
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex-1 flex justify-center">
                <Card className="shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={item.img}
                      alt={item.title}
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
            className={`w-4 h-4 rounded-full border-2 transition ${
              index === selectedIndex
                ? "bg-green-600 border-green-600"
                : "border-green-600"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
