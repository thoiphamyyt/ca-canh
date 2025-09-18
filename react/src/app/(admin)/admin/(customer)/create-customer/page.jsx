import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "./form";
// import DropzoneComponent from "@/components/form/form-elements/DropZone";
import React from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Thêm mới sản phẩm`,
  description: description,
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm mới khách hàng" />
      <Form />
    </div>
  );
}
