import { Mail, Phone, MapPin, User, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserUpdateDialog from "../../(auth)/profile/updateUserDialog";

export default function CheckoutUserInfo({ user, loading }) {
  return (
    <div className="border rounded-xl bg-gray-50 dark:bg-gradient-to-br from-slate-800 to-slate-900 p-10 shadow-lg">
      <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">
        Thông tin khách hàng
      </h2>

      {loading ? (
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-blue-600/20 bg-blue-800/20 rounded-full">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-600" />
            </div>
            <Skeleton className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-600" />
          </li>

          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-green-600/20 bg-green-800/20 rounded-full">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-600" />
            </div>
            <Skeleton className="h-4 w-40 rounded bg-gray-200 dark:bg-slate-600" />
          </li>

          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-yellow-600/20 bg-yellow-800/20 rounded-full">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-600" />
            </div>
            <Skeleton className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-600" />
          </li>

          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-red-600/20 bg-red-800/20 rounded-full">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-600" />
            </div>
            <Skeleton className="h-4 w-48 rounded bg-gray-200 dark:bg-slate-600" />
          </li>
        </ul>
      ) : (
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-blue-600/20 bg-blue-800/20 rounded-full">
              <User className="w-5 h-5 dark:text-blue-400 text-blue-600" />
            </div>
            <span>{user.name}</span>
          </li>

          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-green-600/20 bg-green-800/20 rounded-full">
              <Mail className="w-5 h-5 dark:text-green-400 text-green-600" />
            </div>
            <span>{user.email}</span>
          </li>

          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-yellow-600/20 bg-yellow-800/20 rounded-full">
              <Phone className="w-5 h-5 dark:text-yellow-400 text-yellow-600" />
            </div>
            <span>{user.phone}</span>
          </li>

          <li className="flex items-center space-x-3">
            <div className="p-2 dark:bg-red-600/20 bg-red-800/20 rounded-full">
              <MapPin className="w-5 h-5 dark:text-red-400 text-red-600" />
            </div>
            <span>{user.address}</span>
          </li>
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between">
        {loading ? (
          <>
            <Skeleton className="h-4 w-64 rounded bg-gray-200 dark:bg-slate-600" />
            <Skeleton className="h-10 w-40 rounded-lg bg-gray-200 dark:bg-slate-600" />
          </>
        ) : (
          <>
            <div className="italic dark:text-red-400 text-red-600">
              Vui lòng kiểm tra thông tin trước khi đặt hàng!
            </div>

            <UserUpdateDialog
              title="Cập nhật thông tin"
              trigger={() => (
                <Button
                  variant="outline"
                  className="flex items-center gap-2 dark:border-slate-600 dark:hover:bg-slate-800"
                >
                  <Pencil className="w-4 h-4" />
                  Cập nhật thông tin
                </Button>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
