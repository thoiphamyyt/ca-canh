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
} from "/src/components/ui/dropdown-menu";
import { Menu, User, ShoppingCart, Phone } from "lucide-react";
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
    <header className="bg-background text-foreground">
      {/* Thanh đen trên cùng */}
      <div className="h-[80px] w-full bg-black dark:bg-gray-900 flex justify-between items-center p-3">
        <div className="ml-3 text-green-500">CaCanh - TraVinh</div>
        <div className="text-white">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Mua hàng
          </Button>
        </div>
      </div>

      {/* Logo + Search + Icons  (thêm border-b ở đây) */}
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-0 border-b border-gray-200">
        {/* Left: Logo + Menu Mobile */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <Link href="/">Trang chủ</Link>
                <Link href="#">Giới thiệu</Link>
                <Link href="#">Sản phẩm</Link>
                <Link href="#">Tin tức</Link>
                <Link href="#">Về chúng tôi</Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center text-2xl font-bold">
            <span className="text-green-600">
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                width={150}
                height={150}
                className="object-cover"
              />
            </span>
          </Link>
        </div>

        {/* Middle: Search bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="flex w-full border border-green-500 rounded-md overflow-hidden">
            <Input
              type="text"
              id="textsearch"
              placeholder="Nhập nội dung tìm kiếm..."
              onChange={(e) => setTextSearch(e.target.value)}
              className="rounded-none border-0 focus:ring-0 h-14 px-4 text-base flex-1"
            />
            <Button
              className="rounded-l-none bg-green-600 hover:bg-green-700 h-14 w-14 px-4 text-lg"
              onClick={() => searchProduct()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 text-lg">
          {!loading && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Link href="#" className="flex items-center gap-1">
                  <User className="h-5 w-5" />{" "}
                  <span className="hidden lg:inline">
                    {user ? user.userName : "Tài khoản"}
                  </span>
                </Link>
              </DropdownMenuTrigger>
              {!user ? (
                <DropdownMenuContent className="text-base">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/login"
                      className="flex items-center gap-1 hover:text-green-600 cursor-pointer"
                    >
                      <span className="hidden lg:inline">Đăng nhập</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/register"
                      className="flex items-center gap-1 hover:text-green-600 cursor-pointer"
                    >
                      <span className="hidden lg:inline">Đăng ký</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent className="text-base">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-1 hover:text-green-600 cursor-pointer"
                    >
                      <span className="hidden lg:inline">
                        Thông tin cá nhân
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="#"
                      className="flex items-center gap-1 hover:text-green-600"
                    >
                      <button onClick={logout}>Đăng xuất</button>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          )}

          <Link href="/cart" className="flex items-center gap-1 relative">
            <ShoppingCart className="h-5 w-5" />
            {cart.length ? (
              <span className="absolute -top-2 left-3 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            ) : (
              <div></div>
            )}
          </Link>
          <div className="hidden lg:block text-sm text-gray-600">
            <Phone className="inline h-4 w-4 mr-1" />
            +123 (456) (7890)
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex container mx-auto justify-center gap-12 py-5 text-lg font-medium">
        <Link href="/">Trang chủ </Link>
        <Link href="#">Giới thiệu</Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <span
              variant="outline"
              className="px-4 text-base flex items-center gap-2"
            >
              Sản phẩm
              <FontAwesomeIcon icon={faChevronDown} className="ml-2 w-4 h-4" />
            </span>
          </DropdownMenuTrigger>
          {category && (
            <DropdownMenuContent className="text-base cursor-pointer">
              {category.map((item, index) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleClick(item.id)}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <Link href="/news">Tin tức</Link>
        <Link href="#">Về chúng tôi</Link>
      </nav>
    </header>
  );
}
