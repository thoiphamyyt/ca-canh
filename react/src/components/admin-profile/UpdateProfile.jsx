"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pen } from "lucide-react";
import { useUser } from "@/context/userContext";
import config from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
export default function UpdateProfile() {
  const { user, setUser, loading } = useUser();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar_url || "/images/user/user-default.jpg"
  );
  const fileInputRef = useRef(null);
  const phoneRegex = /^(?:\+84|0)(?:3|5|7|8|9)[0-9]{8}$/;
  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: "Tên đăng nhập không được trống." })
      .min(6, {
        message: "Tên đăng nhập ít nhất 6 ký tự.",
      }),
    name: z.string().min(1, {
      message: "Họ tên không được trống.",
    }),
    password: z.string().optional(),
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
    avatar: z
      .refine((file) => !file || file instanceof File, {
        message: "Avatar phải là một tệp hợp lệ.",
      })
      .optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      username: user?.userName,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      avatar: null,
      avatar_url: user?.avatar_url || null,
      password: "",
    },
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      form.setValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("userName", values.username);
    formData.append("email", values.email || "");
    formData.append("address", values.address || "");
    formData.append("phone", values.phone || "");
    formData.append("password", values.password);
    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar);
    }

    try {
      setLoadingProcess(true);
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/update-customer/${user.id}`,
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
          description: data.message || `Cập nhật thông tin thất bại!`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `Cập nhật thông tin thành công!`,
          variant: "success",
        });
        setUser(data.data);
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

  if (loading) {
    return "Đang tải dữ liệu...";
  }
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <DialogTrigger asChild>
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          <Pen className="w-5 h-5" />
          Cập nhật
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">CẬP NHẬT THÔNG TIN</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] mt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex justify-center">
                  <img
                    src={
                      avatarPreview ||
                      (typeof form.avatar_url === "string"
                        ? `${form.avatar_url}`
                        : "/images/user/user-default.jpg")
                    }
                    alt="avatar"
                    className="w-32 h-32 rounded-full object-cover cursor-pointer border"
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tên đăng nhập</Label>
                      <FormControl>
                        <Input disabled={true} {...field} />
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
                      <Label>Họ và tên</Label>
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
                      Đang xử lý...
                    </>
                  ) : (
                    "Cập nhật"
                  )}
                </button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
