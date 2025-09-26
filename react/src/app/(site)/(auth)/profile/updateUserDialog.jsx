"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useToast } from "@/hooks/use-toast";
import config from "@/config";
export default function UserUpdateDialog({ title = "Cập nhật", trigger }) {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || null, // đường dẫn ảnh hoặc file upload
    avatar_url: user?.avatar_url || null, // đường dẫn ảnh hoặc file upload
    avatarPreview: null, // để hiện preview ảnh khi chọn file mới
  });

  //check validate email and phone
  function isValidEmail(email) {
    // Regex chuẩn cơ bản
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // Cho phép số Việt Nam: 09, 03, 07, 08, 05 + 8 số sau
    return /^(0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const fileInputRef = useRef(null);

  // Khi bấm vào ảnh => trigger chọn file
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
        avatarPreview: URL.createObjectURL(file), // hiện ảnh preview
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Họ tên không được để trống";
      if (!isValidEmail(formData.email)) newErrors.email = "Email không hợp lệ";
      if (!isValidPhone(formData.phone))
        newErrors.phone = "Số điện thoại không hợp lệ";
      if (!formData.address.trim())
        newErrors.address = "Địa chỉ không được để trống";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({}); // clear errors nếu hợp lệ

      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("address", formData.address);
      if (formData.avatar instanceof File) {
        form.append("avatar", formData.avatar);
      }
      setLoadingProcess(true);
      const res = await fetch(`${config.NEXT_PUBLIC_API}/api/user-update`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = await res.json();
      setLoadingProcess(false);
      if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");
      if (data.success) {
        toast({
          title: "Thành công",
          description: "Cập nhật tài khoản thành công!",
          variant: "success",
        });
        // cập nhật lại context user
        setUser(data.user);
        setOpen(false);
      } else {
        toast({
          title: "Thất bại",
          description: "Cập nhật tài khoản thất bại!",
          variant: "error",
        });
      }
    } catch (err) {
      toast({
        title: "Thất bại",
        description: err.message,
        variant: "error",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <DialogTrigger asChild>
        {trigger ? (
          trigger({ open, setOpen })
        ) : (
          <Button className="w-full sm:w-auto">{title}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">CẬP NHẬT THÔNG TIN</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <img
              src={
                formData.avatarPreview ||
                (typeof formData.avatar_url === "string"
                  ? `${formData.avatar_url}`
                  : "/images/user-default.jpg")
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
          <div>
            <Label>Họ và tên</Label>
            <Input
              name="name"
              type="string"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label>Điện thoại</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <Label>Địa chỉ</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            {loadingProcess ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-t-blue-500 border-gray-200 rounded-full animate-spin mr-2"></span>
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
