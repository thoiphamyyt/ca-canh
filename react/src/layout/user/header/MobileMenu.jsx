"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden text-gray-700 dark:text-gray-200">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        <nav className="flex flex-col gap-4">
          <Link href="/">Trang chủ</Link>
          <Link href="/introduce">Giới thiệu</Link>
          <Link href="/product">Sản phẩm</Link>
          <Link href="/news">Tin tức</Link>
          <Link href="/about">Về chúng tôi</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
