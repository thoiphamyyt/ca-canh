"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <div className="h-[60px] w-full bg-black flex justify-between items-center px-4 text-white">
      <div className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent select-none">
        CaCanh <span className="text-white/80">- Trà Vinh</span>
      </div>
      <Link href="/product">
        <Button className="bg-orange-500 hover:bg-orange-400 text-white">
          Mua hàng
        </Button>
      </Link>
    </div>
  );
}
