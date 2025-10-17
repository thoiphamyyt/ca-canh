"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { columns } from "./column";
import { DataTable } from "./data-table";
import React from "react";
import { useState } from "react";
import AlertConfirm from "@/components/shadcn/alertConfirm";
import { useToast } from "@/hooks/use-toast";
import config from "@/config";
import SearchCommon from "@/components/common/SearchCommon";
import { listStatusNew } from "@/lib/contants";

export default function LayoutNews() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [selected, setSelectedStatus] = useState("");
  const { toast } = useToast();

  const handleOpenDialog = (news) => {
    setSelectedNews(news);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedNews) return;

    try {
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/delete-news/${selectedNews.id}`,
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
          description: data.message || "Xóa bản tin thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Xóa bản tin thành công!",
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
        title="Danh sách bản tin"
        actionCreate={true}
        urlCreate="/admin/create-news"
        className="flex-1 flex flex-col h-[calc(100vh-115px)] overflow-hidden"
      >
        <SearchCommon
          onSearch={(params) => {
            setTextSearch(params.textSearch);
            setSelectedStatus(params.selectValue);
          }}
          placeholder="Tìm kiếm tên bài viết..."
          selectPlaceholder="Chọn trạng thái..."
          isSelect={true}
          listSelect={[{ value: "", label: "Tất cả" }, ...listStatusNew]}
        />
        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns(handleOpenDialog)}
            isReload={isReload}
            status={selected}
            title={textSearch}
          />
        </div>
      </ComponentCard>
      <AlertConfirm
        open={isOpenDialog}
        title="Xoá bản tin"
        message={`Bạn có chắc chắn muốn xoá bản tin ${selectedNews?.title}?`}
        actionText="Xoá"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenDialog(false)}
      />
    </div>
  );
}
