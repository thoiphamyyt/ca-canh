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
import { listStatusContacts } from "@/lib/contants";

export default function LayoutContacts() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [selected, setSelectedStatus] = useState("");
  const { toast } = useToast();

  const handleOpenDialog = (contacts) => {
    setSelectedContacts(contacts);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedContacts) return;

    try {
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/contacts/${selectedContacts.id}`,
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
          description: data.message || "Xóa thông tin liên hệ thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Xóa thông tin liên hệ thành công!",
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
        title="Danh sách thông tin liên hệ"
        className="flex-1 flex flex-col h-[calc(100vh-115px)] overflow-hidden"
      >
        <SearchCommon
          onSearch={(params) => {
            setTextSearch(params.textSearch);
            setSelectedStatus(params.selectValue);
          }}
          placeholder="Tìm kiếm thông tin liên hệ..."
          selectPlaceholder="Chọn trạng thái..."
          isSelect={true}
          listSelect={[{ value: "", label: "Tất cả" }, ...listStatusContacts]}
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
        title="Xoá thông tin liên hệ"
        message={`Bạn có chắc chắn muốn xoá thông tin liên hệ ${selectedContacts?.title}?`}
        actionText="Xoá"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenDialog(false)}
      />
    </div>
  );
}
