const url_image = "/storge/public/";
const link_image_default = "/images/image-default.png";
const link_public_api = process.env.NEXT_PUBLIC_API || "http://localhost:8000/";
const title = "Website Cá Cảnh";
const description =
  "Website bán cá cảnh, cá kiểng, cá rồng, cá la hán, cá thủy sinh cùng các phụ kiện cá cảnh.";
const listStatusOrder = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "processing", label: "Đã xác nhận" },
  { value: "shipped", label: "Đang giao hàng" },
  { value: "completed", label: "Đã giao hàng" },
  { value: "cancelled", label: "Đã hủy" },
];
const listStatusNew = [
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Đăng tải" },
];

const listStatusContacts = [
  { value: "new", label: "Mới tạo" },
  { value: "read", label: "Đã xem" },
  { value: "replied", label: "Đã liên hệ" },
];

export {
  url_image,
  link_image_default,
  link_public_api,
  title,
  description,
  listStatusOrder,
  listStatusNew,
  listStatusContacts,
};
