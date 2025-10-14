import Link from "next/link";

export default function FooterCategories({ categories, onSelect }) {
  return (
    <div>
      <h3 className="font-semibold text-xl mb-4 text-cyan-800 dark:text-cyan-300">
        Danh mục sản phẩm
      </h3>
      {categories.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          Đang tải dữ liệu...
        </p>
      ) : (
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href="#"
                onClick={() => onSelect(category.id)}
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
