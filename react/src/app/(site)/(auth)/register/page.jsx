import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FormRegister from "./form-register";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl bg-gray-100 dark:bg-gray-800">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Đăng ký tài khoản
          </h1>
          <FormRegister />
          <p className="text-sm text-center mt-4">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
