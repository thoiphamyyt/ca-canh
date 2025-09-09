"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import config from "@/config";
import { useToast } from "@/hooks/use-toast";

export default function FormRegister() {
  const phoneRegex = /^(?:\+84|0)(?:3|5|7|8|9)[0-9]{8}$/;
  const formSchema = z
    .object({
      username: z
        .string()
        .min(1, { message: "Tên đăng nhập không được trống." })
        .min(6, {
          message: "Rên đăng nhập ít nhất 6 ký tự.",
        }),
      name: z.string().min(1, {
        message: "Họ tên không được trống.",
      }),
      password: z
        .string()
        .min(1, { message: "Mật khẩu không được để trống." })
        .min(6, { message: "Mật khẩu ít nhất 6 ký tự." }),
      confirmPassword: z
        .string()
        .min(1, { message: "Nhập lại mật khẩu không được để trống." }),
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"], // báo lỗi ở confirmPassword
      message: "Nhập lại mật khẩu không khớp.",
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
      confirmPassword: "",
    },
  });

  const { toast } = useToast();

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
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: data.message || "Đăng ký thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Đăng ký tài khoản thành công!",
          variant: "success",
        });
        form.reset(); // reset form nếu muốn
      }
    } catch (error) {
      toast({
        title: "Thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "warning",
      });
      return;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng nhập họ và tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng nhập tên đăng nhập" {...field} />
              </FormControl>
              {/* <FormDescription>
                    Vui lòng nhập tên đăng nhập.
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng nhập email" {...field} />
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
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng nhập địa chỉ" {...field} />
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
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng nhập số điện thoại" {...field} />
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
                  type="password"
                  placeholder="Vui lòng nhập mật khẩu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Vui lòng nhập lại mật khẩu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
      </form>
    </Form>
  );
}
