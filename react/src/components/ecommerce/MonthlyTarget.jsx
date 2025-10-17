"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import { MoreHorizontal, ArrowDown, ArrowUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { statisticalMonth } from "@/lib/callApi";
import { formatNumberVi } from "@/lib/utils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const statistical = await statisticalMonth();
      setData(statistical.success ? statistical : null);
    }
    fetchData();
  }, []);

  const baseOptions = useMemo(
    () => ({
      colors: ["#2E90FA"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "radialBar",
        height: 330,
        sparkline: { enabled: true },
      },
      plotOptions: {
        radialBar: {
          startAngle: -85,
          endAngle: 85,
          hollow: { size: "80%" },
          track: {
            background: "#E4E7EC",
            strokeWidth: "100%",
            margin: 5,
          },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: "36px",
              fontWeight: "600",
              offsetY: -40,
              color: "#1D2939",
              formatter: (val) => `${val}%`,
            },
          },
        },
      },
      fill: { type: "solid", colors: ["#2E90FA"] },
      stroke: { lineCap: "round" },
      labels: ["Progress"],
    }),
    []
  );

  const baseSeries = useMemo(() => [data?.growth_rate || 0], []);

  if (!mounted) {
    return (
      <div className="h-[330px] flex items-center justify-center text-gray-400">
        Đang tải biểu đồ...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Mục tiêu doanh thu tháng
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Theo dõi tiến độ doanh thu bán cá cảnh trong tháng này
            </p>
          </div>
          <div className="relative inline-block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <MoreHorizontal className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-lg rounded-xl p-2 text-sm font-medium"
              >
                <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                <DropdownMenuItem>Xuất báo cáo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={baseOptions}
              series={baseSeries}
              type="radialBar"
              height={330}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            {data?.progress || 0} so với tháng trước
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Doanh thu hiện tại đạt 82% mục tiêu, shop đang có tín hiệu tăng trưởng
          tốt! Tiếp tục duy trì nhé 🐟
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Mục tiêu tháng
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {formatNumberVi(data?.target || 0)}
            <ArrowDown className="h-5 w-4 text-red-500" />
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Doanh thu hiện tại
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {formatNumberVi(data?.current_revenue || 0)}
            <ArrowUp className="h-5 w-4 text-green-500" />
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Hôm nay
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {formatNumberVi(data?.today_revenue || 0)}
            <ArrowUp className="h-5 w-4 text-green-500" />
          </p>
        </div>
      </div>
    </div>
  );
}
