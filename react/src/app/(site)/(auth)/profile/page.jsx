"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, UserCircle2 } from "lucide-react";
import { useUser } from "@/context/userContext";
import UserUpdateDialog from "./updateUserDialog";
import { link_public_api } from "@/lib/contants";
import Image from "next/image";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md md:max-w-2xl shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center text-center space-y-3">
          {!user.avatar ? (
            <UserCircle2 className="w-24 h-24 text-gray-500 dark:text-gray-300" />
          ) : (
            <Image
              src={`${link_public_api}/${user.avatar}`}
              width={150}
              height={150}
              alt={user.name}
              className="object-cover rounded-[50%] w-[130px] h-[130px]"
            ></Image>
          )}
          <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">@{user.userName}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>{user.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <UserUpdateDialog />
            <Button
              variant="outline"
              className="w-full sm:w-auto"
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
