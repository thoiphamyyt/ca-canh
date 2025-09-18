import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "./form";
import React from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Thêm mới danh mục sản phẩm`,
  description: description,
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm mới danh mục sản phẩm" />
      <Form />
    </div>
  );
}
