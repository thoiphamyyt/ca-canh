"use client";

import dynamic from "next/dynamic";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import { EcommerceMetrics } from "./EcommerceMetrics";
import { use, useEffect, useState } from "react";
import { statisticalCustomer } from "@/lib/callApi";

const MonthlySalesChart = dynamic(
  () => import("@/components/ecommerce/MonthlySalesChart"),
  { ssr: false }
);
const StatisticsChart = dynamic(
  () => import("@/components/ecommerce/StatisticsChart"),
  { ssr: false }
);

export default function EcommerceClient() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const statistical = await statisticalCustomer();
      setData(statistical);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics data={data} />
        <MonthlySalesChart data={data} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart data={data} />
      </div>

      <div className="col-span-12">
        <RecentOrders />
      </div>
    </div>
  );
}
