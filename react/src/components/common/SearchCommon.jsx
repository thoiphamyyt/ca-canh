"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "../form/Select";
import { Search, X } from "lucide-react";

export default function SearchCommon({
  onSearch,
  placeholder = "Nhập nội dung cần tìm...",
  isSelect = false,
  listSelect = [],
  selectPlaceholder = "Chọn loại tìm kiếm...",
}) {
  const [textSearch, setTextSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      textSearch: textSearch.trim(),
      selectValue: selectedValue,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-3 mb-5"
    >
      <Input
        placeholder={placeholder}
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        className="
          w-[350px] h-11 rounded-lg
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200"
      />
      {isSelect && listSelect.length > 0 && (
        <div>
          <Select
            onChange={(value) => setSelectedValue(value)}
            options={listSelect}
            placeholder={selectPlaceholder}
            className="dark:bg-dark-900 w-[200px] h-10"
          />
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          className="
            flex items-center gap-2
            h-10 px-5 rounded-lg
            bg-blue-600 hover:bg-blue-700
            text-white font-medium
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
        >
          <Search size={18} />
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
}
