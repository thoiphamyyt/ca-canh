"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, UserCircle2 } from "lucide-react";
import { useUser } from "@/context/userContext";
import UserUpdateDialog from "./updateUserDialog";
import { link_public_api } from "@/lib/contants";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfile() {
  const { user, loading, logout } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">
          Đang tải thông tin...
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/profile.webp')",
        backgroundAttachment: "fixed",
      }}
    >
      <Card className="w-full max-w-md md:max-w-2xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="flex flex-col items-center text-center space-y-4 bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          {!user.avatar ? (
            <UserCircle2 className="w-28 h-28 text-white/80" />
          ) : (
            <Image
              src={
                user.avatar_url
                  ? user.avatar_url
                  : link_public_api + user.avatar
              }
              width={150}
              height={150}
              alt={user.name}
              className="object-cover rounded-full w-[120px] h-[120px] border-4 border-white shadow-lg"
            />
          )}
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              {user.name}
            </CardTitle>
            <p className="text-sm text-white/80">@{user.userName}</p>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6 px-6 py-8">
          <div className="grid gap-6 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-500" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>{user.address}</span>
            </div>
          </div>
          <Skeleton className="h-[1px] w-full bg-gray-300 dark:bg-gray-700" />
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <UserUpdateDialog />
            <Button
              variant="outline"
              className="w-full sm:w-auto hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={logout}
            >
              Đăng xuất
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
