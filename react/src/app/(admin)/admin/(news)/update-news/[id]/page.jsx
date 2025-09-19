import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "../../create-news/form";
import React, { use } from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Cập nhật bản tin`,
  description: description,
};

export default function FormElements({ params }) {
  const { id } = use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Cập nhật bản tin" />
      <Form isUpdate={true} newsId={id} />
    </div>
  );
}
