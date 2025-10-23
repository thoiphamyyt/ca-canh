"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import TextArea from "@/components/form/form-elements/TextArea";
import { Button } from "@/components/ui/button";
import config from "@/config";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.NEXT_PUBLIC_API}/api/ca-canh/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast({
          title: "Thành công",
          description: "Gửi thông tin thành công!",
          variant: "success",
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Thất bại",
          description: "Gửi thông tin thất bại, vui lòng thử lại.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi gửi thông tin:", error);
      toast({
        title: "Thất bại",
        description: "Gửi thông tin thất bại, vui lòng thử lại.",
        variant: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Liên hệ với chúng tôi
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Họ và tên
          </label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nhập họ tên của bạn"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Nhập địa chỉ email"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nội dung
          </label>
          <TextArea
            name="message"
            value={form.message}
            onChange={(value) => setForm({ ...form, ["message"]: value })}
            required
            placeholder="Nhập tin nhắn của bạn..."
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white"
        >
          {loading ? "Đang gửi..." : "Gửi liên hệ"}
        </Button>
      </form>
    </div>
  );
}
