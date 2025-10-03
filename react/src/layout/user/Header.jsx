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
                <Link href="#" className="flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline">
                    {user ? user.userName : "Tài khoản"}
                  </span>
                </Link>
              </DropdownMenuTrigger>
              {!user ? (
                <DropdownMenuContent className="bg-gray-800 text-gray-200">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="hover:text-green-400">
                      Đăng nhập
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="hover:text-green-400">
                      Đăng ký
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent className="bg-gray-800 text-gray-200">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="hover:text-green-400">
                      Thông tin cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="hover:text-green-400">
                      Đơn hàng của bạn
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={logout} className="hover:text-green-400">
                      Đăng xuất
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
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
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <span className="flex items-center gap-2 hover:text-green-400">
              Sản phẩm
              <FontAwesomeIcon icon={faChevronDown} className="ml-1 w-4 h-4" />
            </span>
          </DropdownMenuTrigger>
          {category && (
            <DropdownMenuContent className="bg-gray-800 text-gray-200">
              {category.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleClick(item.id)}
                  className="hover:text-green-400"
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <Link href="/news" className="hover:text-green-400">
          Tin tức
        </Link>
        <Link href="#" className="hover:text-green-400">
          Về chúng tôi
        </Link>
      </nav>
    </header>
  );
}
