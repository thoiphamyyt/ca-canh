"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { object } from "zod";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseOptions = useMemo(
    () => ({
      colors: ["#465fff"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "bar",
        height: 180,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "39%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 4, colors: ["transparent"] },
      xaxis: {
        categories: [...Array(12)].map((x, i) => `Thg ${i + 1}`),
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Outfit",
      },
      yaxis: { title: { text: undefined } },
      grid: { yaxis: { lines: { show: true } } },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.3,
          gradientToColors: ["#7b8cff"],
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      tooltip: {
        theme: "dark",
        x: { show: true, formatter: (val) => val },
        y: {
          formatter: (val) => val,
          title: {
            formatter: () => "Số lượng:",
          },
        },
      },
    }),
    []
  );

  const baseSeries = useMemo(
    () => [
      {
        name: "Sales",
        data:
          data && data.statistics
            ? Object.values(data.statistics).map((x) => x)
            : Array(12).fill(null),
      },
    ],
    [data]
  );

  if (!mounted) {
    return (
      <div className="h-[330px] flex items-center justify-center text-gray-400">
        Đang tải biểu đồ...
      </div>
    );
  }

  const safeOptions = {
    ...baseOptions,
    chart: { ...baseOptions.chart },
    plotOptions: { ...baseOptions.plotOptions },
    xaxis: { ...baseOptions.xaxis },
    tooltip: { ...baseOptions.tooltip },
  };

  const safeSeries = baseSeries.map((s) => ({
    ...s,
    data: Array.isArray(s.data) ? [...s.data] : s.data,
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Khách hàng đăng ký theo tháng
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart
            options={safeOptions}
            series={safeSeries}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
