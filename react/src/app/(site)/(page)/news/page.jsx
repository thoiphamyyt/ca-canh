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
import { Search } from "lucide-react";
import { fetchNews } from "@/lib/callApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import NewArtical from "./newArtical";

export default function AquariumNewsPage() {
  const [query, setQuery] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDataNews();
  }, []);

  const loadDataNews = async (searchText = "") => {
    try {
      setLoading(true);
      const data = await fetchNews({ status: "published", title: searchText });
      setNews(data ?? []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    loadDataNews(query.trim());
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-sky-900 dark:text-sky-400">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
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
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden p-3">
                    <div className="md:flex h-full gap-3">
                      <Skeleton className="w-full md:w-40 h-[140px] rounded-md" />
                      <div className="flex-1 space-y-2 mt-2 md:mt-0">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex gap-3 mt-3">
                          <Skeleton className="h-3 w-1/4" />
                          <Skeleton className="h-3 w-1/5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            <aside>
              <Card className="p-4">
                <div className="py-2">
                  <Skeleton className="h-6 w-32 mb-3" />
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-[1px] p-2 rounded-lg"
                    >
                      <Skeleton className="w-[90px] h-[90px] rounded-md" />
                      <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </aside>
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
                            item.images_url?.length
                              ? item.images_url[0]
                              : "/images/product/product-default.png"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <CardHeader className="p-0 h-[85%]">
                          <CardTitle className="text-justify text-lg hover:text-green-500">
                            <Link href={`/detail-news/${item.slug}`}>
                              {item.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 text-justify">
                            <div className="prose max-w-none dark:prose-invert text-justify">
                              {typeof item.content === "string" ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.content,
                                  }}
                                />
                              ) : (
                                item.content
                              )}
                            </div>
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

            <NewArtical />
          </div>
        </main>
      ) : (
        <div className="text-center py-12 text-slate-500">
          Chưa có dữ liệu bài viết.
        </div>
      )}
    </div>
  );
}
