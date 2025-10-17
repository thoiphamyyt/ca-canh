"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { useState, useEffect } from "react";
import AlertConfirm from "@/components/shadcn/alertConfirm";
import { useToast } from "@/hooks/use-toast";
import SearchCommon from "@/components/common/SearchCommon";
import { fetchCategory } from "@/lib/fetchProduct";

export default function LayoutProduct() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [selected, setSelectedCategory] = useState("");
  const [categories, setCategory] = useState("");
  const { toast } = useToast();

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setIsOpenDialog(true);
  };

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await fetchCategory({});
        setCategory(data ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
      }
    }
    loadCategory();
  }, []);

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
        <SearchCommon
          onSearch={(params) => {
            setTextSearch(params.textSearch);
            setSelectedCategory(params.selectValue);
          }}
          placeholder="Tìm kiếm sản phẩm..."
          selectPlaceholder="Chọn danh mục sản phẩm..."
          isSelect={true}
          listSelect={
            categories
              ? categories.map((item) => {
                  return { value: item.id, label: item.name };
                })
              : []
          }
        />
        <DataTable
          columns={columns(handleOpenDialog)}
          isReload={isReload}
          textSearch={textSearch}
          category={selected}
        />
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
