"use client";

import { useEffect, useState } from "react";
import { fetchCategory } from "@/lib/fetchProduct";
import { useRouter, useSearchParams } from "next/navigation";
import FooterAbout from "./FooterAbout";
import FooterLinks from "./FooterLinks";
import FooterCategories from "./FooterCategories";
import FooterSocial from "./FooterSocial";
import ScrollToTopButton from "./ScrollToTopButton";

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

      {visible && <ScrollToTopButton />}
    </footer>
  );
}
