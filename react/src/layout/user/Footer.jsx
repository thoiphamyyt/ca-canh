"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, ArrowUp } from "lucide-react";
import { fetchCategory } from "@/lib/fetchProduct";
import { useRouter, useSearchParams } from "next/navigation";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hiện nút khi scroll xuống
  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Lấy danh mục
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
        {/* Cột 1 - Giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
            CaCanhTV
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            CaCanhTV chuyên cung cấp các loại cá cảnh, hồ thủy sinh và phụ kiện
            độc đáo. Chúng tôi mang đến sự tươi mới cho không gian sống của bạn
            với những sản phẩm chất lượng nhất.
          </p>
          <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
            Liên hệ
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>📍 Ấp Tân Thành Tây, xã Tân Hòa, Tỉnh Vĩnh Long</li>
            <li>✉️ cacanhTV@gmail.com</li>
            <li>📞 +84 123 456 789</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4 text-cyan-800 dark:text-cyan-300">
            Về chúng tôi
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                href="/introduce"
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                Chính sách vận chuyển
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                Chính sách đổi trả
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4 text-cyan-800 dark:text-cyan-300">
            Danh mục sản phẩm
          </h3>
          {categories.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">
              Đang tải dữ liệu...
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href="#"
                    onClick={() => handleClick(category.id)}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4 text-cyan-800 dark:text-cyan-300">
            Theo dõi chúng tôi
          </h3>
          <div className="flex gap-3 mt-4 flex-wrap">
            {[Facebook, Twitter, Instagram].map((Icon, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="icon"
                className="bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-600 hover:text-white dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-600"
              >
                <Icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Image
                key={i}
                src={`/images/footer${i}.jpg`}
                alt={`footer${i}`}
                width={70}
                height={60}
                className="rounded-md object-cover border border-cyan-100 dark:border-cyan-800"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-200 dark:border-cyan-800 py-4 text-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
        © 2025{" "}
        <span className="text-cyan-700 dark:text-cyan-400 font-semibold">
          CaCanhTV
        </span>
        . All rights reserved.
      </div>

      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
