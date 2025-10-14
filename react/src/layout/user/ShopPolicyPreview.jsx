"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ShopPolicyPreview() {
  const policies = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      title: "Bảo hành chất lượng",
      desc: "Cam kết bảo hành sản phẩm và sức khỏe cá theo chính sách cửa hàng.",
    },
    {
      icon: <Truck className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      title: "Giao hàng tận nơi",
      desc: "Hỗ trợ giao nhanh toàn quốc, đảm bảo cá khỏe mạnh khi nhận.",
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      title: "Đổi trả linh hoạt",
      desc: "Đổi trả dễ dàng trong 3 ngày nếu sản phẩm lỗi hoặc không đúng mô tả.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ tư vấn chăm sóc cá cảnh luôn sẵn sàng hỗ trợ bạn.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold dark:text-white text-sky-900">
          Chính sách & Dịch vụ
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Mua sắm an tâm với những chính sách đảm bảo từ CaCanhTV
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {policies.map((item, index) => (
          <Card
            key={index}
            className="border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-900"
          >
            <CardContent className="p-6 text-center flex flex-col items-center gap-3">
              <div className="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/about">
          <Button className="bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-400 transition-all">
            Xem chi tiết chính sách
          </Button>
        </Link>
      </div>
    </section>
  );
}
