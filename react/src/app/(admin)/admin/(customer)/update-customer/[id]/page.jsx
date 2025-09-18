import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "../../create-customer/form";
import React, { use } from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Cập nhật thông tin khách hàng`,
  description: description,
};

export default function FormElements({ params }) {
  const { id } = use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Cập nhật thông tin khách hàng" />
      <Form isUpdate={true} customerId={id} />
    </div>
  );
}
