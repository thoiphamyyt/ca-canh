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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function FormCreateCustomer({
  isUpdate = false,
  customerId = null,
}) {
  const { toast } = useToast();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingData, setLoadingData] = useState(isUpdate ? true : false);
  const [progress, setProgress] = useState(0);
  const phoneRegex = /^(?:\+84|0)(?:3|5|7|8|9)[0-9]{8}$/;
  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: "Tên đăng nhập không được trống." })
      .min(6, {
        message: "Rên đăng nhập ít nhất 6 ký tự.",
      }),
    name: z.string().min(1, {
      message: "Họ tên không được trống.",
    }),
    password: !isUpdate
      ? z
          .string()
          .min(1, { message: "Mật khẩu không được để trống." })
          .min(6, { message: "Mật khẩu ít nhất 6 ký tự." })
      : z
          .string()
          .optional()
          .refine((val) => !val || val.length >= 6, {
            message: "Mật khẩu ít nhất 6 ký tự.",
          }),
    email: z
      .string()
      .optional()
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Email không đúng định dạng.",
      }),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || phoneRegex.test(val), {
        message: "Số điện thoại không đúng định dạng.",
      }),
    address: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    },
  });
  useEffect(() => {
    if (isUpdate && customerId) {
      loadDetailCustomer();
    }
  }, [isUpdate, customerId]);

  const loadDetailCustomer = async () => {
    if (!customerId) return;
    try {
      setLoadingData(true);
      setProgress(30);
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-customer/${customerId}`,
        { method: "GET", credentials: "include" }
      );
      setProgress(70);
      const data = await res.json();

      if (res.ok && data.success) {
        const customer = data.data;

        // Đổ dữ liệu vào form
        form.reset({
          username: customer.userName || "",
          name: customer.name || "",
          email: customer.email || "",
          address: customer.address || "",
          phone: customer.phone || "",
          password: "",
        });
      }
      setProgress(100); // hoàn tất
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không tải được dữ liệu khách hàng.",
      });
    } finally {
      setTimeout(() => setLoadingData(false), 500); // delay 1 chút để thấy progress full
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("userName", values.username);
    formData.append("email", values.email || "");
    formData.append("address", values.address || "");
    formData.append("phone", values.phone || "");
    formData.append("password", values.password);

    try {
      setLoadingProcess(true);
      let action = isUpdate
        ? `update-customer/${customerId}`
        : "create-customer";
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
            `${isUpdate ? "Cập nhật" : "Thêm"} khách hàng thất bại!`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `${
            isUpdate ? "Cập nhật" : "Thêm"
          } khách hàng thành công!`,
          variant: "success",
        });
        if (isUpdate) {
          loadDetailCustomer();
        } else {
          form.reset({
            userName: "",
            name: "",
            email: "",
            address: "",
            phone: "",
            password: "",
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
      title={isUpdate ? "Thông tin khách hàng" : "Thêm mới khách hàng"}
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tên đăng nhập</Label>
                      <FormControl>
                        <Input disabled={!!isUpdate} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tên khách hàng</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Địa chỉ</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Số điện thoại</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Vui lòng nhập mật khẩu"
                          {...field}
                        />
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
              <Link href="/admin/customer-manager">
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
