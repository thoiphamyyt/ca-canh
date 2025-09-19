import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "./form";
import React from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Thêm mới bản tin`,
  description: description,
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm mới bản tin" />
      <Form />
    </div>
  );
}
