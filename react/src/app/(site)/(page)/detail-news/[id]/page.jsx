"use client";

import { useEffect, useState, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { newsBySlug } from "@/lib/callApi";
import { formatDate } from "@/lib/utils";
import NewArtical from "../../news/newArtical";
import { useParams } from "next/navigation";

export default function DetailNew() {
  const { id } = useParams();
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
              {Array.from({ length: 5 }).map((_, i) => (
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
              ))}
            </aside>
          </div>
        </div>
      ) : dataDetail ? (
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold">{dataDetail.title}</h1>
              <div className="text-sm text-muted-foreground">
                <span>
                  📅 {formatDate(dataDetail.created_at, "dd:MM:yyyy")}
                </span>
              </div>
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

            <NewArtical />
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
