"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, UserCircle2, ShoppingBag, LogOut } from "lucide-react";
import { useUser } from "@/context/userContext";

export default function UserMenu() {
  const { user, loading, logout } = useUser();

  if (loading) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
          <User className="h-5 w-5" />
          <span className="hidden lg:inline font-medium">
            {user ? user.userName : "Tài khoản"}
          </span>
        </div>
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
                className="flex items-center gap-2 cursor-pointer"
              >
                <UserCircle2 className="h-4 w-4 text-blue-500" />
                Đăng nhập
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/register"
                className="flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-blue-500" />
                Đăng ký
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex items-center gap-2 cursor-pointer"
              >
                <UserCircle2 className="h-4 w-4 text-blue-500" />
                Thông tin cá nhân
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/orders"
                className="flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-blue-500" />
                Đơn hàng của bạn
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="flex items-center gap-2 text-red-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
