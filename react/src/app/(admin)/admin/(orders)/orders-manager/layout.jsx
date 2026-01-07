"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { useState } from "react";
import AlertConfirm from "@/components/shadcn/alertConfirm";
import { useToast } from "@/hooks/use-toast";
import SearchCommon from "@/components/common/SearchCommon";
import { listStatusOrder } from "@/lib/contants";

export default function LayoutOrders() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { toast } = useToast();

  const handleOpenDialog = (orders) => {
    setSelectedOrders(orders);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedOrders) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/ca-canh/delete-order/${selectedOrders.id}`,
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
          description: data.message || "Xóa đơn hàng thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Xóa đơn hàng thành công!",
          variant: "success",
        });
        setIsReload(!isReload);
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
        title="Danh sách đơn hàng"
        actionCreate={false}
        className="flex-1 flex flex-col h-[calc(100vh-115px)] overflow-hidden"
      >
        <SearchCommon
          onSearch={(params) => {
            setTextSearch(params.textSearch);
            setSelectedStatus(params.selectValue);
          }}
          placeholder="Tìm kiếm mã đơn hàng..."
          selectPlaceholder="Chọn trạng thái..."
          isSelect={true}
          listSelect={[{ value: "", label: "Tất cả" }, ...listStatusOrder]}
        />
        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns(handleOpenDialog)}
            isReload={isReload}
            textSearch={textSearch}
            status={selectedStatus}
          />
        </div>
      </ComponentCard>
      <AlertConfirm
        open={isOpenDialog}
        title="Xoá đơn hàng"
        message={`Bạn có chắc chắn muốn xoá đơn hàng không?`}
        actionText="Xoá"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenDialog(false)}
      />
    </div>
  );
}
