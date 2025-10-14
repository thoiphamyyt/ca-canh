import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FormLogin from "./form-login";

export default function LoginPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/login.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <Card className="relative w-full max-w-md shadow-lg rounded-2xl dark:bg-gray-800">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
          <FormLogin />

          <p className="text-sm text-center mt-4">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <div className="text-right mt-3">
            <Link
              href="/forgot-password"
              className="text-sm text-sky-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
