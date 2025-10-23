import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
export default function Information() {
  return (
    <aside className="space-y-8">
      <Card className="bg-white dark:bg-gray-800 border border-sky-100 dark:border-gray-700 shadow-lg dark:shadow-sky-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white text-lg font-semibold">
            Thông tin liên hệ
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-1" />
            <p className="text-sm">
              Ấp Tân Thành Tây, Xã Tân Hòa, Tỉnh Vĩnh Long
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-1" />
            <p className="text-sm">(+84) 987 654 321</p>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-1" />
            <p className="text-sm">cacanhtravinh@gmail.com</p>
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="w-full bg-sky-600 hover:bg-sky-500 text-white shadow-md">
              Gọi ngay
            </Button>
            <Button
              variant="outline"
              className="w-full border-sky-300 dark:border-gray-700 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800"
            >
              Gửi email
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
