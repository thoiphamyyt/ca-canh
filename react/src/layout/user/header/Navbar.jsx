"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ category, isSticky, onSelect }) {
  return (
    <nav
      className={`hidden lg:flex w-full justify-center gap-12 py-4 text-lg font-medium
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-all duration-500 ease-in-out z-50
        ${isSticky ? "fixed top-0 shadow-md" : "relative"}
      `}
    >
      <Link href="/" className="hover:text-blue-600">
        Trang chủ
      </Link>
      <Link href="/introduce" className="hover:text-blue-600">
        Giới thiệu
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            Sản phẩm
            <FontAwesomeIcon icon={faChevronDown} className="ml-1 w-4 h-4" />
          </span>
        </DropdownMenuTrigger>

        {category?.length > 0 && (
          <DropdownMenuContent
            align="start"
            className="mt-2 min-w-[180px] rounded-xl border bg-gray-100/95 dark:bg-gray-800/95"
          >
            {category.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => onSelect(item.id)}
                className="cursor-pointer hover:text-blue-600"
              >
                <span>{item.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      <Link href="/news" className="hover:text-blue-600">
        Tin tức
      </Link>
      <Link href="/about" className="hover:text-blue-600">
        Về chúng tôi
      </Link>
    </nav>
  );
}
