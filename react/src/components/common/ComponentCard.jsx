import Link from "next/link";
import React from "react";

const ComponentCard = ({
  title,
  children,
  className = "",
  desc = "",
  actionCreate = false,
  urlCreate = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="px-6 py-5 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        {actionCreate && (
          <Link href={urlCreate}>
            <button className="px-3 py-1 rounded-md bg-sky-500 hover:bg-sky-300 dark:hover:bg-sky-900">
              Thêm mới
            </button>
          </Link>
        )}
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
