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
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push("/product?" + params.toString());
  };

  const searchProduct = () => {
    const params = new URLSearchParams(searchParams);
    if (textSearch.trim() === "") {
      params.delete("product");
    } else {
      params.set("product", textSearch);
    }
    router.push("/product?" + params.toString());
  };

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md">
      <div className="h-[50px] w-full bg-black flex justify-between items-center px-4">
        <div className="text-green-400 font-semibold">CaCanh - TraVinh</div>
        <div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Mua hàng
          </Button>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 border-b border-gray-800 py-3">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 text-gray-200">
              <nav className="flex flex-col gap-4">
                <Link href="/">Trang chủ</Link>
                <Link href="/introduce">Giới thiệu</Link>
                <Link href="/product">Sản phẩm</Link>
                <Link href="/news">Tin tức</Link>
                <Link href="#">Về chúng tôi</Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="object-cover"
            />
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="flex w-full border border-green-500 rounded-md overflow-hidden">
            <Input
              type="text"
              id="textsearch"
              placeholder="Nhập nội dung tìm kiếm..."
              onChange={(e) => setTextSearch(e.target.value)}
              className="rounded-none border-0 focus:ring-0 h-12 px-4 text-base flex-1 text-gray-900"
            />
            <Button
              className="rounded-l-none bg-green-600 hover:bg-green-700 h-12 w-14 px-4"
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
                  className="flex items-center gap-2 hover:text-green-500 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline font-medium">
                    {user ? user.userName : "Tài khoản"}
                  </span>
                </Link>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-100 shadow-lg rounded-xl p-2 text-sm font-medium"
              >
                {!user ? (
                  <>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-md dark:hover:bg-green-800 focus:bg-green-600/20 focus:text-green-400 transition"
                    >
                      <Link href="/login" className="flex items-center gap-2">
                        <UserCircle2 className="h-4 w-4 text-green-600" />
                        Đăng nhập
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-md dark:hover:bg-green-800 focus:bg-green-600/20 focus:text-green-400  transition"
                    >
                      <Link
                        href="/register"
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="h-4 w-4 text-green-600" />
                        Đăng ký
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-md dark:hover:bg-green-800 focus:bg-green-600/20 focus:text-green-400  transition"
                    >
                      <Link href="/profile" className="flex items-center gap-2">
                        <UserCircle2 className="h-4 w-4 text-green-600" />
                        Thông tin cá nhân
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-md dark:hover:bg-green-800 focus:bg-green-600/20 focus:text-green-400 transition"
                    >
                      <Link href="/orders" className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-green-600" />
                        Đơn hàng của bạn
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 border-gray-300 dark:border-gray-700" />

                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer rounded-md dark:hover:bg-red-800/20 focus:bg-red-600/20 focus:text-red-400 transition flex items-center gap-2"
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
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 left-3 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <div className="hidden lg:block text-sm text-gray-400">
            <Phone className="inline h-4 w-4 mr-1" /> +123 (456) (7890)
          </div>
          <ModeToggle />
        </div>
      </div>

      <nav className="hidden lg:flex container mx-auto justify-center gap-12 py-4 text-lg font-medium">
        <Link href="/" className="hover:text-green-400">
          Trang chủ
        </Link>
        <Link href="/introduce" className="hover:text-green-400">
          Giới thiệu
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex items-center gap-2 cursor-pointer text-gray-100 hover:text-green-400 transition-colors">
              Sản phẩm
              <FontAwesomeIcon icon={faChevronDown} className="ml-1 w-4 h-4" />
            </span>
          </DropdownMenuTrigger>

          {category && (
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="mt-2 min-w-[180px]rounded-xl border border-slate-700/40 bg-gray-900/95 backdrop-blur-md text-gray-100 shadow-lg shadow-black/30 animate-in fade-in-10 slide-in-from-top-2
          "
            >
              {category.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleClick(item.id)}
                  className="cursor-pointer flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-all duration-200 hover:bg-green-600/20 hover:text-green-400 focus:bg-green-600/20 focus:text-green-400"
                >
                  <span>{item.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <Link href="/news" className="hover:text-green-400">
          Tin tức
        </Link>
        <Link href="/about" className="hover:text-green-400">
          Về chúng tôi
        </Link>
      </nav>
    </header>
  );
}
