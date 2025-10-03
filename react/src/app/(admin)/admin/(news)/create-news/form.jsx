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
import TipTap from "@/components/tiptap/Tiptap";
import TextArea from "@/components/form/form-elements/TextArea";
import { Button } from "@/components/ui/button";

export default function FormCreateNews({ isUpdate = false, newsId = null }) {
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingData, setLoadingData] = useState(isUpdate ? true : false);
  const [progress, setProgress] = useState(0);
  const [imageRemoved, setImageRemoved] = useState([]);
  const listStatus = [
    { value: "draft", label: "Nháp" },
    { value: "published", label: "Đăng tải" },
  ];
  const formSchema = z.object({
    title: z.string().min(1, { message: "Tiêu đề không được trống." }),
    status: z
      .string({
        required_error: "Vui lòng chọn trạng thái",
      })
      .refine((val) => ["draft", "published"].includes(val), {
        message: "Vui lòng chọn trạng thái hợp lệ",
      }),
    content: z.string().optional(),
    slug: z.string().optional(),
    images: z.any().optional(),
    link: z.string().optional(),
    description: z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "",
      link: "",
      description: "",
      images: [],
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));
    setImages((prev) => [...prev, ...newImages]);

    form.setValue("images", [...(form.getValues("images") || []), ...files]);
  };

  const handleRemoveImage = (id) => {
    if (isUpdate) {
      const img = images.find((img) => img.id === id);

      if (img && !img.file) {
        setImageRemoved((prev) => [...prev, img.path]);
      }
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  useEffect(() => {
    if (isUpdate && newsId) {
      loadDetailNews();
    }
  }, [isUpdate, newsId]);

  const loadDetailNews = async () => {
    if (!newsId) return;
    try {
      setLoadingData(true);
      setProgress(30);
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-news/${newsId}`,
        { method: "GET", credentials: "include" }
      );
      setProgress(70);
      const data = await res.json();

      if (res.ok && data.success) {
        const news = data.data;

        form.reset({
          title: news.title ?? "",
          content: news.content || "",
          status: news.status || "",
          link: news.link || "",
          description: news.description || "",
          image: [],
        });

        if (news.images_url && Array.isArray(news.images_url)) {
          setImages(
            news.images_url.map((url, idx) => ({
              id: idx,
              name: url.split("/").pop(),
              url: url,
              file: null,
              path: news.images && news.images[idx] ? news.images[idx] : url,
            }))
          );
        }
      }

      setProgress(100);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không tải được dữ liệu bài viết.",
      });
    } finally {
      setTimeout(() => setLoadingData(false), 500);
    }
  };

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("status", values.status);
    formData.append("link", values.link);
    formData.append("description", values.description);
    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images[]", file);
      });
    }
    if (isUpdate && imageRemoved.length > 0) {
      imageRemoved.forEach((url) => {
        formData.append("images_removed[]", url);
      });
    }
    try {
      setLoadingProcess(true);
      let action = isUpdate ? `update-news/${newsId}` : "create-news";
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
            `${isUpdate ? "Cập nhật" : "Thêm"} bài viết thất bại!`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `${isUpdate ? "Cập nhật" : "Thêm"} bài viết thành công!`,
          variant: "success",
        });
        if (isUpdate) {
          loadDetailNews();
        } else {
          form.reset({
            title: "",
            content: "",
            status: "",
            link: "",
            description: "",
            image: null,
          });
          setImages([]);
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
    <ComponentCard title={isUpdate ? "Nội dung bản tin" : "Thêm mới bản tin"}>
      {isUpdate && loadingData ? (
        <Progress value={progress} className="w-full h-1" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tiêu đề</Label>
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
                      <Label>Mô tả ngắn </Label>
                      <FormControl>
                        <TextArea rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Nội dung</Label>
                      <FormControl>
                        <TipTap value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Nguồn</Label>
                      <FormControl>
                        <Input {...field} />
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
                          options={listStatus}
                          placeholder="Chọn trạng thái"
                          className="dark:bg-dark-900"
                          onChange={(option) => field.onChange(option?.value)} // lấy value
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <FormLabel>Hình ảnh</FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          multiple
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={handleFileChange}
                          className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="relative overflow-hidden rounded-lg border shadow"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-32 object-cover"
                      />
                      <p className="text-xs p-1 truncate">{img.name}</p>
                    </div>
                  ))}
                </div>
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
              <Link href="/admin/news-manager">
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
