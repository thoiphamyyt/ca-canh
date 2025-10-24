"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { ModeToggle } from "@/components/mode-toggle";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { phone } from "@/lib/contants";

export default function MainHeader() {
  const { cart } = useCart();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/images/logo-dark.png" : "/images/logo.png";

  return (
    <div className="container mx-auto flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 py-3">
      <div className="flex items-center gap-4">
        <MobileMenu />
        <Link href="/" className="flex items-center">
          <Image src={logoSrc} alt="Logo" width={130} height={130} priority />
        </Link>
      </div>

      <div className="hidden lg:flex flex-1 max-w-xl mx-8">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 text-base">
        <UserMenu />

        <Link href="/cart" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 left-3 bg-orange-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        <div className="hidden lg:block text-sm">
          <Phone className="inline h-4 w-4 mr-1" /> {phone}
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}
