"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { useState } from "react";
import AlertConfirm from "@/components/shadcn/alertConfirm";
import { useToast } from "@/hooks/use-toast";

export default function LayoutProduct() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const { toast } = useToast();

  const handleOpenDialog = (category) => {
    setSelectedCategory(category);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/ca-canh/delete-category/${selectedCategory.id}`,
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
          description: data.message || "Xóa sản phẩm thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Xóa sản phẩm thành công!",
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
        title="Danh mục sản phẩm"
        actionCreate={true}
        urlCreate="/admin/create-category"
      >
        <DataTable columns={columns(handleOpenDialog)} isReload={isReload} />
        {/* <BasicTableOne /> */}
      </ComponentCard>
      <AlertConfirm
        open={isOpenDialog}
        title="Xoá loai sản phẩm"
        message={`Bạn có chắc chắn muốn xoá loại sản phẩm ${selectedCategory?.name}?`}
        actionText="Xoá"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenDialog(false)}
      />
    </div>
  );
}
