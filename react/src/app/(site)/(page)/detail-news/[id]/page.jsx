"use client";

import { useEffect, useState, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { newsBySlug } from "@/lib/callApi";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function DetailNew({ params }) {
  const { id } = use(params);
  const [dataDetail, setDataDetail] = useState({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDetail() {
      try {
        const data = await newsBySlug(id);
        setDataDetail(data);
      } catch {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    getDetail();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {loading ? (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-2/3 rounded" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-6 w-1/2 rounded" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </section>
            <aside className="space-y-6">
              <Skeleton className="h-[290px] w-full rounded-xl" />
              <Skeleton className="h-[290px] w-full rounded-xl" />
            </aside>
          </div>
        </div>
      ) : dataDetail ? (
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content */}
            <section className="lg:col-span-2 space-y-6">
              {/* Title */}
              <h1 className="text-3xl font-bold">{dataDetail.title}</h1>
              <div className="text-sm text-muted-foreground">
                <span>
                  📅 {formatDate(dataDetail.created_at, "dd:MM:yyyy")}
                </span>
              </div>
              {/* Content */}
              <div className="prose max-w-none dark:prose-invert text-justify">
                {typeof dataDetail.content === "string" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: dataDetail.content }}
                  />
                ) : (
                  dataDetail.content
                )}
              </div>
              <div>
                {dataDetail.link && (
                  <span className="italic text-sm">
                    📰 Nguồn: {dataDetail.link}
                  </span>
                )}
              </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-6 mt-20">
              <Card className="p-2">
                <CardContent>
                  <div className="py-2">
                    <h3 className="font-semibold text-xl">Bài viết mới nhất</h3>
                  </div>
                  <ScrollArea className="h-full mt-3">
                    <div className="space-y-3">
                      {dataDetail.recentPosts.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 border-[1px]"
                        >
                          <img
                            src={
                              item.images_url
                                ? item.images_url[0]
                                : "/images/product/product-default.png"
                            }
                            alt={item.title}
                            className="w-[100px] h-[100px] object-cover"
                          />
                          <div className="p-2 space-y-2">
                            <div className="font-medium">
                              <Link href={`/detail-news/${item.slug}`}>
                                {item.title}
                              </Link>
                            </div>
                            <div className="text-xs text-slate-500">
                              {formatDate(item.created_at, "dd/MM/yyyy")}
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
        <div className="container mx-auto p-6 text-center text-lg">
          Không tìm thấy thông tin bài viết
        </div>
      )}
    </div>
  );
}
