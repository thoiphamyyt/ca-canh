import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { title } from "@/lib/contants";

export const metadata = {
  title: `${title} | Danh sách sản phẩm`,
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sản phẩm" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách sản phẩm" actionCreate={true}>
          <DataTable columns={columns} />
          {/* <BasicTableOne /> */}
        </ComponentCard>
      </div>
    </div>
  );
}
