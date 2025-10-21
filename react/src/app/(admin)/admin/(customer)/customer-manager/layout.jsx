"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { useState } from "react";
import AlertConfirm from "@/components/shadcn/alertConfirm";
import { useToast } from "@/hooks/use-toast";
import SearchCommon from "@/components/common/SearchCommon";

export default function LayoutCustomer() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const { toast } = useToast();
  const [textSearch, setTextSearch] = useState("");

  const handleOpenDialog = (customer) => {
    setSelectedCustomer(customer);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/ca-canh/create-customer/${selectedCustomer.id}`,
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
    <div className="space-y-6">
      <ComponentCard
        title="Danh sách khách hàng"
        actionCreate={true}
        urlCreate="/admin/create-customer"
        className="flex-1 flex flex-col h-[calc(100vh-115px)] overflow-hidden"
      >
        <SearchCommon
          onSearch={(params) => {
            setTextSearch(params.textSearch);
          }}
          placeholder="Tìm kiếm họ tên, tên đăng nhập..."
        />
        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns(handleOpenDialog)}
            isReload={isReload}
            textSearch={textSearch}
          />
        </div>
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
  );
}
