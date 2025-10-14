"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // icon loading
import config from "@/config";
import { useToast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp!",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            email,
            password,
            password_confirmation: confirm,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: data.message || "Đã có lỗi xảy ra, vui lòng thử lại!",
        });
        return;
      }

      toast({
        title: "Thành công",
        description: "Đổi mật khẩu thành công!",
        variant: "success",
      });

      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Lỗi hệ thống",
        description: "Không thể kết nối đến máy chủ!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            Đặt lại mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
