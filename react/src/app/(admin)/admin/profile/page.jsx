import UserInfoCard from "@/components/admin-profile/UserInfoCard";
import UserMetaCard from "@/components/admin-profile/UserMetaCard";
import { title, description } from "@/lib/contants";
import React from "react";

export const metadata = {
  title: title,
  description: description,
};

export default function Profile() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Thông tin cá nhân
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
        </div>
      </div>
    </div>
  );
}
