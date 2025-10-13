"use client";
import { useState, useEffect } from "react";
import { fetchCategory } from "@/lib/fetchProduct";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";

export default function Header() {
  const [category, setCategory] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md transition-colors duration-300">
      <TopBar />
      <MainHeader />
      <Navbar category={category} isSticky={isSticky} />
    </header>
  );
}
