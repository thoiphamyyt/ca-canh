"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Send, Twitter, ArrowUp } from "lucide-react";

export default function Footer() {
  const [visible, setVisible] = useState(false);

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

  // Scroll lên đầu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background text-foreground border-t mt-10 relative">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4 md:px-6">
        {/* Logo + Info */}
        <div className="text-base">
          <div className="flex items-center gap-2">
            {/* <Image src="/logo.png" alt="Carrot Logo" width={30} height={30} /> */}
            <h2 className="text-2xl font-bold">Carrot</h2>
          </div>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Carrot is the biggest market of grocery products. Get your daily
            needs from our store.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600 text-sm md:text-base">
            <li className="flex gap-2">
              📍 51 Green St.Huntington ohio beach ontario, NY 11746 KY 4783,
              USA.
            </li>
            <li className="flex gap-2">✉️ example@email.com</li>
            <li className="flex gap-2">📞 +91 123 4567890</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4">Company</h3>
          <ul className="space-y-2 text-sm md:text-base text-gray-600">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Delivery Information</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Support Center</Link>
            </li>
          </ul>
        </div>

        {/* Category */}
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4">Category</h3>
          <ul className="space-y-2 text-sm md:text-base text-gray-600">
            <li>Dairy & Bakery</li>
            <li>Fruits & Vegetable</li>
            <li>Snack & Spice</li>
            <li>Juice & Drinks</li>
            <li>Chicken & Meat</li>
            <li>Fast Food</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-xl md:text-2xl mb-4">
            Subscribe Our Newsletter
          </h3>
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <Input placeholder="Enter your email..." className="flex-1" />
            <Button size="icon" className="sm:w-auto">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button variant="outline" size="icon">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="w-4 h-4" />
            </Button>
          </div>

          {/* Images */}
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

      {/* Bottom line */}
      <div className="border-t py-4 text-center text-xs md:text-sm text-gray-500">
        © 2025 <span className="text-green-600 font-semibold">CaCanhTV</span>,
        All rights reserved.
      </div>

      {/* Scroll To Top Button */}
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
