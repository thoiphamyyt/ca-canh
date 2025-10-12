"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "/src/components/ui/input";
import { Button } from "/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "/src/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "/src/components/ui/dropdown-menu";
import {
  Menu,
  User,
  ShoppingCart,
  Phone,
  UserCircle2,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@/context/userContext";
import { fetchCategory } from "@/lib/fetchProduct";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/cartContext";

export default function Header() {
  const { user, loading, logout } = useUser();
  const [category, setCategory] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCart();

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await fetchCategory();
        setCategory(data);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    }
    loadCategory();
  }, []);

  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") params.delete("category");
    else params.set("category", category);
    router.push("/product?" + params.toString());
  };

  const searchProduct = () => {
    const params = new URLSearchParams(searchParams);
    if (textSearch.trim() === "") params.delete("product");
    else params.set("product", textSearch);
    router.push("/product?" + params.toString());
  };

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md transition-colors duration-300">
      <div className="h-[50px] w-full bg-black flex justify-between items-center px-4 text-white">
        <div className="font-semibold tracking-wide text-sky-500">
          CaCanh - Trà Vinh
        </div>
        <Button className="bg-orange-500 hover:bg-orange-400 text-white dark:text-white">
          Mua hàng
        </Button>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 py-3">
        <div className="flex items-center gap-4">
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

          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={130}
              height={130}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Ô tìm kiếm */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="flex w-full border border-blue-400 dark:border-blue-600 rounded-md overflow-hidden">
            <Input
              type="text"
              placeholder="Tìm kiếm cá, hồ, phụ kiện..."
              onChange={(e) => setTextSearch(e.target.value)}
              className="rounded-none border-0 focus:ring-0 h-12 px-4 text-base flex-1 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            />
            <Button
              className="rounded-l-none bg-blue-600 hover:bg-blue-700 h-12 w-14 px-4 text-white"
              onClick={() => searchProduct()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-base">
          {!loading && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline font-medium">
                    {user ? user.userName : "Tài khoản"}
                  </span>
                </Link>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-lg rounded-xl p-2 text-sm font-medium"
              >
                {!user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <UserCircle2 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        Đăng nhập
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/register"
                        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <ShoppingBag className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        Đăng ký
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <UserCircle2 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        Thông tin cá nhân
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <ShoppingBag className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        Đơn hàng của bạn
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 border-gray-300 dark:border-gray-600" />

                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            {cart.length > 0 && (
              <span className="absolute -top-2 left-3 bg-orange-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <div className="hidden lg:block text-sm text-gray-700 dark:text-gray-300">
            <Phone className="inline h-4 w-4 mr-1" /> +84 123 456 789
          </div>

          <ModeToggle />
        </div>
      </div>

      <nav className="hidden lg:flex container mx-auto justify-center gap-12 py-4 text-lg font-medium text-gray-700 dark:text-gray-200 transition-colors">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Trang chủ
        </Link>
        <Link
          href="/introduce"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Giới thiệu
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sản phẩm
              <FontAwesomeIcon icon={faChevronDown} className="ml-1 w-4 h-4" />
            </span>
          </DropdownMenuTrigger>

          {category && (
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="mt-2 min-w-[180px] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100/95 dark:bg-gray-800/95 backdrop-blur-md text-gray-800 dark:text-gray-200 shadow-lg"
            >
              {category.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleClick(item.id)}
                  className="cursor-pointer px-3 py-2.5 text-sm rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span>{item.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <Link
          href="/news"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Tin tức
        </Link>
        <Link
          href="/about"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Về chúng tôi
        </Link>
      </nav>
    </header>
  );
}
