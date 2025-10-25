"use client";

import { useEffect, useState } from "react";
import { fetchCategory } from "@/lib/fetchProduct";
import { useRouter, useSearchParams } from "next/navigation";
import FooterAbout from "./FooterAbout";
import FooterLinks from "./FooterLinks";
import FooterCategories from "./FooterCategories";
import FooterSocial from "./FooterSocial";
import ScrollToTopButton from "./ScrollToTopButton";
import { phone } from "@/lib/contants";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await fetchCategory();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategory();
  }, []);

  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    category === "all"
      ? params.delete("category")
      : params.set("category", category);
    router.push("/product?" + params.toString());
  };

  return (
    <footer className="relative transition-colors duration-300 bg-cyan-50 text-slate-700 border-t border-cyan-200 dark:bg-[#0d1b2a] dark:text-slate-200 dark:border-cyan-900">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4 md:px-6">
        <FooterAbout />
        <FooterLinks />
        <FooterCategories categories={categories} onSelect={handleClick} />
        <FooterSocial />
      </div>

      <div className="border-t border-cyan-200 dark:border-cyan-800 py-4 text-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
        © 2025{" "}
        <span className="text-cyan-700 dark:text-cyan-400 font-semibold">
          CaCanhTV
        </span>
        . All rights reserved.
      </div>
      <div className="fixed bottom-[80px] right-6 flex flex-col gap-3 z-50">
        <a
          href={`https://zalo.me/${phone.replace(/\s+/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 animate-swing"
          title="Chat qua Zalo"
        >
          <img src="/images/zalo.png" alt="Zalo" className="w-8 h-8" />
        </a>
        <a
          href="https://m.me/100003880469096"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-2
          rounded-full shadow-lg transition-transform hover:scale-110 animate-swing delay-200"
          title="Chat qua Messenger"
        >
          <img
            src="/images/messenger.png"
            alt="Messenger"
            className="w-8 h-8"
          />
        </a>
      </div>
      {visible && <ScrollToTopButton />}
    </footer>
  );
}
