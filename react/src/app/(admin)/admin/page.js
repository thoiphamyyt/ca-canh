import React from "react";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import EcommerceClient from "@/components/ecommerce/EcommerceClient";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <>
      <EcommerceClient />
    </>
  );
}
