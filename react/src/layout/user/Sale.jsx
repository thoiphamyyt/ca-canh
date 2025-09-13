"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const sales = [
  {
    id: 1,
    title: "Fresh & Healthy Organic Fruits",
    discount: "35% Off",
    desc: "on first order",
    color: "bg-pink-200 dark:bg-pink-400",
    image: "/images/footer1.jpg",
  },
  {
    id: 2,
    title: "Healthy Bakery Products",
    discount: "30% Off",
    desc: "on first order",
    color: "bg-green-200 dark:bg-green-400",
    image: "/images/footer2.jpg",
  },
  {
    id: 3,
    title: "Fresh Snacks & Sweets",
    discount: "20% Off",
    desc: "on first order",
    color: "bg-orange-200 dark:bg-orange-400",
    image: "/images/footer3.jpg",
  },
  {
    id: 4,
    title: "Healthy Bakery Products",
    discount: "30% Off",
    desc: "on first order",
    color: "bg-blue-200 dark:bg-blue-400",
    image: "/images/footer4.jpg",
  },
  {
    id: 5,
    title: "Fresh Snacks & Sweets",
    discount: "20% Off",
    desc: "on first order",
    color: "bg-rose-200 dark:bg-rose-400",
    image: "/images/footer5.jpg",
  },
  {
    id: 6,
    title: "Fresh & Healthy Organic Fruits",
    discount: "35% Off",
    desc: "on first order",
    color: "bg-sky-200 dark:bg-sky-400",
    image: "/images/footer1.jpg",
  },
];

export default function SaleSlider() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay()]
  );

  return (
    <section className="container mx-auto py-12">
      <div className="overflow-hidden px-2" ref={emblaRef}>
        {/* Track */}
        <div className="flex">
          {sales.map((s, i) => (
            <div
              key={s.id}
              className="shrink-0 flex-[0_0_80%] md:flex-[0_0_33.334%] px-2 h-[270px]" // spacing nằm ngoài snap
            >
              <div
                className={`${s.color} rounded-xl px-6 py-9 justify-between h-full flex`}
              >
                <div className="flex flex-col gap-3 w-[50%]">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="text-green-700 dark:text-green-950 font-semibold text-xl">
                    {s.discount}
                  </p>
                  <p className="text-gray-600 dark:text-gray-950">{s.desc}</p>
                  <button className="mt-3 bg-green-600 dark:bg-green-800 text-white px-4 py-2 rounded-md w-fit">
                    Shop Now
                  </button>
                </div>
                <Image
                  src={s.image}
                  alt={s.title}
                  width={150}
                  height={120}
                  className="rounded-[50%] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
