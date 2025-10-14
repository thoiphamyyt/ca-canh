"use client";
import { useState, useEffect } from "react";
import { fetchCategory } from "@/lib/fetchProduct";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const [category, setCategory] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 120);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategory();
        setCategory(data);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    })();
  }, []);

  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    category === "all"
      ? params.delete("category")
      : params.set("category", category);
    router.push("/product?" + params.toString());
  };

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md transition-colors duration-300">
      <TopBar />
      <MainHeader />
      <Navbar category={category} isSticky={isSticky} onSelect={handleClick} />
    </header>
  );
}
