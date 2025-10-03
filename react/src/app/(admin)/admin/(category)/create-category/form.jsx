"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Label from "@/components/form/Label";
import config from "@/config";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/form/form-elements/InputField";
import TextArea from "@/components/form/form-elements/TextArea";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function FormCreateCategory({
  isUpdate = false,
  categoryId = null,
}) {
  const { toast } = useToast();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingData, setLoadingData] = useState(isUpdate ? true : false);
  const [progress, setProgress] = useState(0);
  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Tên danh mục sản phẩm không được trống." })
      .optional(),
    description: z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isUpdate && categoryId) {
      loadDetailCategory();
    }
  }, [isUpdate, categoryId]);

  const loadDetailCategory = async () => {
    if (!categoryId) return;
    try {
      setLoadingData(true);
      setProgress(30);
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-category/${categoryId}`,
        { method: "GET", credentials: "include" }
      );
      setProgress(70);
      const data = await res.json();

      if (res.ok && data.success) {
        const category = data.data;
        form.reset({
          name: category.name ?? "",
          description: category.description || "",
        });
      }
      setProgress(100);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không tải được dữ liệu danh mục sản phẩm.",
      });
    } finally {
      setTimeout(() => setLoadingData(false), 500);
    }
  };

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    try {
      setLoadingProcess(true);
      let action = isUpdate
        ? `update-category/${categoryId}`
        : "create-category";
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/${action}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description:
            data.message ||
            `${isUpdate ? "Cập nhật" : "Thêm"} danh mục sản phẩm thất bại!`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `${
            isUpdate ? "Cập nhật" : "Thêm"
          } danh mục sản phẩm thành công!`,
          variant: "success",
        });
        if (isUpdate) {
          loadDetailCategory();
        } else {
          form.reset({
            name: "",
            description: "",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "warning",
      });
      return;
    } finally {
      setLoadingProcess(false);
    }
  }

  return (
    <ComponentCard
      title={
        isUpdate ? "Thông tin danh mục sản phẩm" : "Thêm mới danh mục sản phẩm"
      }
    >
      {isUpdate && loadingData ? (
        <Progress value={progress} className="w-full h-1" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tên danh mục</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Mô tả</Label>
                      <FormControl>
                        <TextArea rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Skeleton className="h-px w-full bg-gray-300" />
            <div className="flex justify-end space-x-3 mt-4">
              <Button
                type="submit"
                disabled={loadingProcess}
                className="ml-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800"
              >
                {loadingProcess ? "Đang lưu..." : "Lưu lại"}
              </Button>
              <Link href="/admin/category-manager">
                <Button className="bg-gradient-to-r from-gray-500 to-zinc-600 hover:from-gray-600 hover:to-zinc-700 text-white px-3 rounded-md">
                  Quay về
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      )}
    </ComponentCard>
  );
}
