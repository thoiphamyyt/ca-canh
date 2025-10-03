import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "./form";
import React, { use } from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Chi tiết đơn hàng`,
  description: description,
};

export default function FormElements({ params }) {
  const { id } = use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Chi tiết đơn hàng" />
      <Form idOrder={id} />
    </div>
  );
}
