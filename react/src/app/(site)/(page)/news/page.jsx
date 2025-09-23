"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { fetchNews } from "@/lib/fetchApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

// Sample data (replace with real API data)
const sampleArticles = [
  {
    id: 1,
    title: "Hướng dẫn chăm sóc cá Betta cho người mới",
    excerpt:
      "Betta là loài cá cảnh phổ biến vì màu sắc rực rỡ và tính cách dễ thuần. Bài viết hướng dẫn cách chọn hồ, thức ăn, và xử lý bệnh cơ bản.",
    image: "/images/image-baner.jpg",
    author: "Nguyễn An",
    date: "2025-08-22",
  },
  {
    id: 2,
    title: "Top 7 loài cá dễ nuôi cho bể cộng đồng",
    excerpt:
      "Bạn muốn một bể cá đẹp, dễ quản lý? Dưới đây là 7 gợi ý loài cá thân thiện, ít bệnh và chịu đựng tốt.",
    image: "/images/image-baner2.jpg",
    author: "Lê Bảo",
    date: "2025-07-10",
  },
  {
    id: 3,
    title: "Thiết kế bể cây thủy sinh: bố cục và cây nên trồng",
    excerpt:
      "Bể thủy sinh đẹp không chỉ cần cây; bố cục, nền và ánh sáng quyết định 80% thành công.",
    image: "/images/image-baner3.jpg",
    author: "Phạm Hòa",
    date: "2025-06-05",
  },
  {
    id: 4,
    title: "Thiết kế bể cây thủy sinh: bố cục và cây nên trồng",
    excerpt:
      "Bể thủy sinh đẹp không chỉ cần cây; bố cục, nền và ánh sáng quyết định 80% thành công.",
    image: "/images/image-baner.jpg",
    author: "Phạm Hòa",
    date: "2025-06-05",
  },
];

export default function AquariumNewsPage() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDataNews() {
      try {
        const data = await fetchNews();
        console.log(data);

        setNews(data);
      } catch {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDataNews();
  }, []);

  const filtered = useMemo(() => {
    return sampleArticles.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q);
      const matchesTag = !selectedTag || a.tags.includes(selectedTag);
      return matchesQuery && matchesTag;
    });
  }, [query, selectedTag]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Tin tức & hướng dẫn về cá cảnh
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              Cập nhật bài viết, mẹo chăm sóc và thiết kế bể cá
            </p>
          </div>

          <div className="w-full md:w-80">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết, từ khóa..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <Separator />

      {loading ? (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <Skeleton className="h-[250px] w-full rounded-xl" />
              </div>
            </section>
            <div>
              <Skeleton className="h-[530px] w-full rounded-xl" />
            </div>
          </div>
        </div>
      ) : news && news.length ? (
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {news.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="md:flex h-full">
                      <div className="relative md:w-44 aspect-square flex-shrink-0">
                        <img
                          src={
                            item.images_url && item.images_url.length
                              ? item.images_url[0]
                              : "/images/product/product-default.png"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <CardHeader className="p-0 h-[70%]">
                          <CardTitle className="text-justify text-lg">
                            <Link href={`/detail-news/${item.slug}`}>
                              {item.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 text-justify">
                            {item.content}
                          </CardDescription>
                        </CardHeader>

                        <div className="mt-3 flex justify-between">
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex-[3]">
                            <div>{item.author}</div>
                            <div>
                              {formatDate(item.created_at, "dd/MM/yyyy")}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {news.length === 0 && (
                <div className="mt-6 text-center text-slate-500">
                  Không tìm thấy bài viết phù hợp.
                </div>
              )}
            </section>

            <aside className="space-y-6">
              <Card className="p-2">
                <CardContent>
                  <div className="py-2">
                    <h3 className="font-semibold text-xl">Bài nổi bật</h3>
                  </div>
                  <ScrollArea className="h-full mt-3">
                    <div className="space-y-3">
                      {sampleArticles.slice(0, 4).map((a) => (
                        <div
                          key={a.id}
                          className="flex items-start gap-3 border-[1px]"
                        >
                          <img
                            src={a.image}
                            alt={a.title}
                            className="w-[100px] h-[100px] object-cover"
                          />
                          <div className="p-2">
                            <div className="font-medium">{a.title}</div>
                            <div className="text-sm text-slate-500">
                              {formatDate(a.date, "dd/MM/yyyy")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      ) : (
        <div>Chưa có dữ liệu</div>
      )}
    </div>
  );
}
