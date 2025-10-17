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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const { toast } = useToast();

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/ca-canh/delete-product/${selectedProduct.id}`,
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
        title="Danh sách sản phẩm"
        actionCreate={true}
        urlCreate="/admin/create-product"
      >
        <DataTable columns={columns(handleOpenDialog)} isReload={isReload} />
      </ComponentCard>
      <AlertConfirm
        open={isOpenDialog}
        title="Xoá sản phẩm"
        message={`Bạn có chắc chắn muốn xoá sản phẩm ${selectedProduct?.product}?`}
        actionText="Xoá"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenDialog(false)}
      />
    </div>
  );
}
