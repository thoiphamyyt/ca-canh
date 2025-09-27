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
import Select from "@/components/form/Select";
import { fetchCategory } from "@/lib/fetchProduct";
import { Progress } from "@/components/ui/progress";

export default function FormCreateProduct({
  isUpdate = false,
  productId = null,
}) {
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingData, setLoadingData] = useState(isUpdate ? true : false);
  const [progress, setProgress] = useState(0);
  const [imageRemoved, setImageRemoved] = useState([]);
  const formSchema = z.object({
    key_product: z
      .string()
      .min(1, { message: "Mã sản phẩm không được trống." }),
    product: z.string().min(1, { message: "Sản phẩm không được trống." }),
    id_category: z
      .string()
      .min(1, { message: "Loại sản phẩm không được trống." }),
    price: z.coerce
      .number({
        required_error: "Đơn giá không được trống.",
        invalid_type_error: "Đơn giá phải là số.",
      })
      .int("Đơn giá phải là số nguyên.")
      .min(1, { message: "Đơn giá phải > 0." }),
    old_price: z
      .union([
        z.literal(""),
        z.coerce.number().int("Đơn giá cũ phải là số nguyên."),
      ])
      .optional(),
    quantity: z.coerce
      .number({
        required_error: "Số lượng không được trống.",
        invalid_type_error: "Số lượng phải là số.",
      })
      .int("Số lượng phải là số nguyên.")
      .min(1, { message: "Số lượng phải > 0." }),
    description: z.string().optional(),
    images: z.any().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      key_product: "",
      quantity: "",
      price: "",
      old_price: "",
      description: "",
      id_category: "",
      images: [],
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // convert sang object URL để preview
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file, // giữ file gốc để gửi API
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
    async function loadCategory(params) {
      try {
        const data = await fetchCategory();
        setCategory(
          data.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          })
        );
      } catch {}
    }
    loadCategory();
  }, []);

  useEffect(() => {
    if (isUpdate && productId) {
      loadDetailProduct();
    }
  }, [isUpdate, productId]);

  const loadDetailProduct = async () => {
    if (!productId) return;
    try {
      setLoadingData(true);
      setProgress(30);
      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/detail-product/${productId}`,
        { method: "GET", credentials: "include" }
      );
      setProgress(70);
      const data = await res.json();

      if (res.ok && data.success) {
        const product = data.data;

        form.reset({
          key_product: String(product.key_product ?? ""),
          product: product.product || "",
          quantity: product.quantity || "",
          price: product.price || "",
          old_price: product.old_price || "",
          description: product.description || "",
          id_category: product.id_category?.toString() || "",
          images: [],
        });

        if (product.images_url && Array.isArray(product.images_url)) {
          setImages(
            product.images_url.map((url, idx) => ({
              id: idx,
              name: url.split("/").pop(),
              url: url,
              file: null,
              path:
                product.images && product.images[idx]
                  ? product.images[idx]
                  : url,
            }))
          );
        }
      }

      setProgress(100);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không tải được dữ liệu sản phẩm.",
      });
    } finally {
      setTimeout(() => setLoadingData(false), 500);
    }
  };

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("key_product", values.key_product);
    formData.append("product", values.product);
    formData.append("quantity", values.quantity);
    formData.append("old_price", values.old_price);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("id_category", values.id_category);
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
      let action = isUpdate ? `update-product/${productId}` : "create-product";
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
            `${isUpdate ? "Cập nhật" : "Thêm"} sản phẩm thất bại!`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `${isUpdate ? "Cập nhật" : "Thêm"} sản phẩm thành công!`,
          variant: "success",
        });
        if (isUpdate) {
          loadDetailProduct();
        } else {
          form.reset({
            product: "",
            key_product: "",
            quantity: "",
            price: "",
            old_price: "",
            description: "",
            id_category: "",
            images: [],
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
    <ComponentCard
      title={isUpdate ? "Thông tin sản phẩm" : "Thêm mới sản phẩm"}
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
                  name="key_product"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Mã sản phẩm</Label>
                      <FormControl>
                        <Input disabled={!!isUpdate} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tên sản phẩm</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Số lượng</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Đơn giá (Vnđ)</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="old_price"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Đơn giá cũ (Vnđ)</Label>
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
                  name="id_category"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Loại sản phẩm</Label>
                      <FormControl>
                        <Select
                          options={category}
                          placeholder="Chọn loại sản phẩm"
                          className="dark:bg-dark-900"
                          {...field}
                        />
                        {/* <Select {...field} /> */}
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
                      <Label>Mô tả sản phẩm </Label>
                      <FormControl>
                        <TextArea rows={6} {...field} />
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
                          accept="image/png, image/jpg, image/jpeg"
                          multiple
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
              <button
                type="submit"
                disabled={loadingProcess}
                className={`flex items-center justify-center bg-blue-700 px-3 py-1 rounded-md text-white ${
                  loadingProcess ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loadingProcess ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-t-blue-500 border-gray-200 rounded-full animate-spin mr-2"></span>
                    Đang lưu...
                  </>
                ) : (
                  "Lưu lại"
                )}
              </button>
              <Link href="/admin/product-manager">
                <button className="bg-gray-400 px-3 py-1 rounded-md">
                  Quay về
                </button>
              </Link>
            </div>
          </form>
        </Form>
      )}
    </ComponentCard>
  );
}
