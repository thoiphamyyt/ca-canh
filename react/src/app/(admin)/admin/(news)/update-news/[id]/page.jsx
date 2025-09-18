import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "../../create-product/form";
import React, { use } from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Cập nhật sản phẩm`,
  description: description,
};

export default function FormElements({ params }) {
  const { id } = use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Cập nhật sản phẩm" />
      <Form isUpdate={true} productId={id} />
    </div>
  );
}
