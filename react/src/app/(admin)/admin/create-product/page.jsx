import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "./form";
// import DropzoneComponent from "@/components/form/form-elements/DropZone";
import React from "react";
import { title } from "@/lib/contants";

export const metadata = {
  title: `${title} | Thêm mới sản phẩm`,
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm mới sản phẩm" />
      <Form />
    </div>
  );
}
