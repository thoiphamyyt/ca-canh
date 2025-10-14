"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import config from "@/config";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ email hợp lệ!",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        toast({
          title: "Thành công",
          description: "Vui lòng kiểm tra email để đặt lại mật khẩu!",
          variant: "success",
        });
        setEmail("");
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: data.message || "Gửi email thất bại!",
        });
      }
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
            Quên mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Đang gửi..." : "Gửi email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
