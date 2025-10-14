export default function FooterAbout() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
        CaCanhTV
      </h2>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        CaCanhTV chuyên cung cấp các loại cá cảnh, hồ thủy sinh và phụ kiện độc
        đáo. Chúng tôi mang đến sự tươi mới cho không gian sống của bạn với
        những sản phẩm chất lượng nhất.
      </p>
      <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
        Liên hệ
      </p>
      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li>📍 Ấp Tân Thành Tây, xã Tân Hòa, Tỉnh Vĩnh Long</li>
        <li>✉️ cacanhTV@gmail.com</li>
        <li>📞 +84 123 456 789</li>
      </ul>
    </div>
  );
}
