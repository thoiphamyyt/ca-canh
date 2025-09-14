"use client";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { useState } from "react";
import AlertConfirm from "@/components/shadcn/alertConfirm";
import { useToast } from "@/hooks/use-toast";

export default function LayoutCustomer() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const { toast } = useToast();

  const handleOpenDialog = (customer) => {
    setSelectedCustomer(customer);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/ca-canh/delete-customer/${selectedCustomer.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: data.message || "Xóa tài khoản thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Xóa tài khoản thành công!",
          variant: "success",
        });
        setIsReload(!isReload); // trigger reload data table
      }
    } catch (error) {
      toast({
        title: "Thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "warning",
      });
    } finally {
      setIsOpenDialog(false);
    }
  };
  return (
    <div>
      <PageBreadcrumb pageTitle="Khách hàng" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách khách hàng"
          actionCreate={true}
          urlCreate="/admin/create-customer"
        >
          <DataTable columns={columns(handleOpenDialog)} isReload={isReload} />
          {/* <BasicTableOne /> */}
        </ComponentCard>
        <AlertConfirm
          open={isOpenDialog}
          title="Xoá khách hàng"
          message={`Bạn có chắc chắn muốn xoá khách hàng ${selectedCustomer?.name}?`}
          actionText="Xoá"
          onConfirm={handleDelete}
          onCancel={() => setIsOpenDialog(false)}
        />
      </div>
    </div>
  );
}
