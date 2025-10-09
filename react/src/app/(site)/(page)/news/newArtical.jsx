"use client";

import { fetchNews } from "@/lib/callApi";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function NewArtical() {
  const [newArticles, setNewArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNew() {
      try {
        const data = await fetchNews({ limit: 5 });
        setNewArticles(data ?? []);
      } catch (error) {
        console.error("no data by error", error);
      } finally {
        setLoading(false);
      }
    }
    loadNew();
  }, []);

  return (
    <aside className="space-y-6">
      <Card className="p-2">
        <CardContent>
          <div className="py-2">
            <h3 className="font-semibold text-xl">Bài viết nổi bật</h3>
          </div>
          <ScrollArea className="h-full mt-3">
            <div className="space-y-3">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-[1px] p-2"
                    >
                      <Skeleton className="w-[100px] h-[100px] rounded-md" />
                      <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  ))
                : newArticles.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-start gap-3 border-[1px] p-2"
                    >
                      <img
                        src={
                          a.images_url
                            ? a.images_url[0]
                            : "/images/product/product-default.png"
                        }
                        alt={a.title}
                        className="w-[100px] h-[100px] object-cover rounded-md"
                      />
                      <div className="p-1 flex-1">
                        <div className="font-medium line-clamp-2 hover:text-green-500">
                          <Link href={`/detail-news/${a.slug}`}>{a.title}</Link>
                        </div>
                        <div className="text-sm text-slate-500">
                          {formatDate(a.created_at, "dd/MM/yyyy")}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </aside>
  );
}
