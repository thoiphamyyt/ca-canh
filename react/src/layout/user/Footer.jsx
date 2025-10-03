"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Send, Twitter, ArrowUp } from "lucide-react";
import { fetchCategory } from "@/lib/fetchProduct";
import { useRouter, useSearchParams } from "next/navigation";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hiện nút khi scroll xuống
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
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

  // Scroll lên đầu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push("/product?" + params.toString());
  };

  return (
    <footer className="bg-gray-900 text-gray-200 border-t border-gray-700 mt-10 relative">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4 md:px-6">
        {/* Logo + Info */}
        <div className="text-base">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-green-400">CaCanhTV</h2>
          </div>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            CaCanhTV chuyên cung cấp các loại cá cảnh đẹp, độc lạ với giá cả hợp
            lý. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm và dịch
            vụ tốt nhất.
          </p>
          <p className="mt-4 text-gray-300 font-semibold">
            Liên hệ với chúng tôi
          </p>
          <ul className="mt-4 space-y-2 text-gray-400 text-sm md:text-base">
            <li className="flex gap-2">
              📍 Ấp Tân Thành Tây, xã Tân Hòa, Tỉnh Vĩnh Long.
            </li>
            <li className="flex gap-2">✉️ cacanhTV@gmail.com</li>
            <li className="flex gap-2">📞 +91 123 4567890</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4 text-white">
            Về chúng tôi
          </h3>
          <ul className="space-y-2 text-sm md:text-base text-gray-400">
            <li>
              <Link href="#">Giới thiệu</Link>
            </li>
            <li>
              <Link href="#">Tin tức</Link>
            </li>
            <li>
              <Link href="#">Chính sách vận chuyển</Link>
            </li>
            <li>
              <Link href="#">Chính sách đổi trả</Link>
            </li>
            <li>
              <Link href="#">Liên hệ</Link>
            </li>
          </ul>
        </div>

        {/* Category */}
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4 text-white">
            Danh mục sản phẩm
          </h3>
          {categories.length === 0 ? (
            <p className="text-gray-400">Đang tải dữ liệu...</p>
          ) : (
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link onClick={() => handleClick(category.id)} href="#">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4 text-white">
            Theo dõi chúng tôi
          </h3>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button
              variant="outline"
              size="icon"
              className="bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
            >
              <Instagram className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Image
              src="/images/footer1.jpg"
              alt="footer1"
              width={70}
              height={60}
              className="rounded-md object-cover"
            />
            <Image
              src="/images/footer2.jpg"
              alt="footer2"
              width={70}
              height={60}
              className="rounded-md object-cover"
            />
            <Image
              src="/images/footer3.jpg"
              alt="footer3"
              width={70}
              height={60}
              className="rounded-md object-cover"
            />
            <Image
              src="/images/footer4.jpg"
              alt="footer4"
              width={70}
              height={60}
              className="rounded-md object-cover"
            />
            <Image
              src="/images/footer5.jpg"
              alt="footer5"
              width={70}
              height={60}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-xs md:text-sm text-gray-500">
        © 2025 <span className="text-green-400 font-semibold">CaCanhTV</span>,
        All rights reserved.
      </div>

      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
