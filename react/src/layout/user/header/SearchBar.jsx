"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [textSearch, setTextSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchProduct = () => {
    const params = new URLSearchParams(searchParams);
    if (textSearch.trim() === "") params.delete("product");
    else params.set("product", textSearch);
    router.push("/product?" + params.toString());
  };

  return (
    <div className="flex w-full border border-sky-400 dark:border-sky-600 rounded-md overflow-hidden">
      <Input
        type="text"
        placeholder="Tìm kiếm cá, hồ, phụ kiện..."
        onChange={(e) => setTextSearch(e.target.value)}
        className="rounded-none border-0 focus:ring-0 h-12 px-4 text-base flex-1 bg-white dark:bg-gray-800"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchProduct();
          }
        }}
      />
      <Button
        className="rounded-l-none bg-sky-600 hover:bg-sky-700 h-12 w-14"
        onClick={searchProduct}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </div>
  );
}
