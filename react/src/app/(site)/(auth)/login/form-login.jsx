"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function FormLogin() {
  const { setUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [loadingProcess, setLoadingProcess] = useState(false);

  const formSchema = z.object({
    username: z.string().min(1, { message: "Tên đăng nhập không được trống." }),
    password: z.string().min(1, { message: "Mật khẩu không được để trống." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("userName", values.username);
    formData.append("password", values.password);

    try {
      setLoadingProcess(true);
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/login`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      setLoadingProcess(false);
      if (!data.success) {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: data.message || "Đăng nhập thất bại!",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Đăng nhập tài khoản thành công!",
          variant: "success",
        });
        // setToken(data._token, 60);
        setUser(data.user);
        if (data.user.role === "admin") {
          router.push("/admin");
          return;
        }
        router.push("/");
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

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  return (
    <div>
      {error === "unauthorized" && (
        <p className="text-red-500 text-center mb-3">
          Tài khoản không có quyền, vui lòng đăng nhập lại!
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tài khoản</FormLabel>
                <FormControl>
                  <Input placeholder="Vui lòng nhập tên đăng nhập" {...field} />
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
          <Button
            type="submit"
            disabled={loadingProcess}
            className={`w-full ${
              loadingProcess ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loadingProcess ? (
              <>
                <span className="inline-block w-4 h-4 bg-green-600 border-2 border-t-blue-500 border-gray-200 rounded-full animate-spin mr-2"></span>
                Đang xử lý...
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
