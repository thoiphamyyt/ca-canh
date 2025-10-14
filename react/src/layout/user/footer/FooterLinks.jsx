import Link from "next/link";

export default function FooterLinks() {
  const links = [
    { label: "Giới thiệu", href: "/introduce" },
    { label: "Tin tức", href: "/news" },
    { label: "Chính sách vận chuyển", href: "/about" },
    { label: "Chính sách đổi trả", href: "/about" },
    { label: "Liên hệ", href: "/about" },
  ];

  return (
    <div>
      <h3 className="font-semibold text-xl mb-4 text-cyan-800 dark:text-cyan-300">
        Về chúng tôi
      </h3>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
