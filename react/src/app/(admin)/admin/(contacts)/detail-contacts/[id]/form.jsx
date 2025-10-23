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
import Select from "@/components/form/Select";
import { Progress } from "@/components/ui/progress";
import TextArea from "@/components/form/form-elements/TextArea";
import { Button } from "@/components/ui/button";
import { listStatusContacts, listStatusNew } from "@/lib/contants";

export default function FormCreateContacts({ idContacts }) {
  const { toast } = useToast();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [progress, setProgress] = useState(0);

  const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    message: z.any().optional(),
    status: z.string({
      required_error: "Vui lòng chọn trạng thái",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      email: "",
      status: "",
    },
  });

  useEffect(() => {
    loadDetailContacts();
  }, [idContacts]);

  const loadDetailContacts = async () => {
    if (!idContacts) return;
    try {
      setLoadingData(true);
      setProgress(30);
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/contacts/${idContacts}`,
        { method: "GET", credentials: "include" }
      );
      setProgress(70);
      const data = await res.json();

      if (res.ok && data.success) {
        const contacts = data.data;

        form.reset({
          name: contacts.name ?? "",
          email: contacts.email || "",
          status: contacts.status || "",
          message: contacts.message || "",
        });
      }

      setProgress(100);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không tải được dữ liệu.",
      });
    } finally {
      setTimeout(() => setLoadingData(false), 500);
    }
  };

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("status", values.stauts);
    try {
      setLoadingProcess(true);
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/contacts/${idContacts}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: values.status }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: data.message || `Cập nhật trạng thái thất bại!`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `Cập nhật trạng thái thành công!`,
          variant: "success",
        });
        loadDetailContacts();
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
    <ComponentCard title="Thông tin liên hệ">
      {loadingData ? (
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
                      <Label>Người liên hệ</Label>
                      <FormControl>
                        <Input {...field} disabled />
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
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Trạng thái </Label>
                      <FormControl>
                        <TextArea rows={6} {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Trạng thái</Label>
                      <FormControl>
                        <Select
                          options={listStatusContacts}
                          placeholder="Chọn trạng thái"
                          className="dark:bg-dark-900"
                          onChange={(option) => field.onChange(option?.value)}
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
              <Link href="/admin/contacts-manager">
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
