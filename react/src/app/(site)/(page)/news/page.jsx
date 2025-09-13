"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Search } from "lucide-react";

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
    tags: ["Betta", "Chăm sóc", "Người mới"],
  },
  {
    id: 2,
    title: "Top 7 loài cá dễ nuôi cho bể cộng đồng",
    excerpt:
      "Bạn muốn một bể cá đẹp, dễ quản lý? Dưới đây là 7 gợi ý loài cá thân thiện, ít bệnh và chịu đựng tốt.",
    image: "/images/image-baner2.jpg",
    author: "Lê Bảo",
    date: "2025-07-10",
    tags: ["Bể cộng đồng", "Dễ nuôi"],
  },
  {
    id: 3,
    title: "Thiết kế bể cây thủy sinh: bố cục và cây nên trồng",
    excerpt:
      "Bể thủy sinh đẹp không chỉ cần cây; bố cục, nền và ánh sáng quyết định 80% thành công.",
    image: "/images/image-baner3.jpg",
    author: "Phạm Hòa",
    date: "2025-06-05",
    tags: ["Thủy sinh", "Thiết kế"],
  },
  {
    id: 4,
    title: "Thiết kế bể cây thủy sinh: bố cục và cây nên trồng",
    excerpt:
      "Bể thủy sinh đẹp không chỉ cần cây; bố cục, nền và ánh sáng quyết định 80% thành công.",
    image: "/images/image-baner.jpg",
    author: "Phạm Hòa",
    date: "2025-06-05",
    tags: ["Thủy sinh", "Thiết kế"],
  },
];

export default function AquariumNewsPage() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = useMemo(() => {
    const s = new Set();
    for (const a of sampleArticles) a.tags.forEach((t) => s.add(t));
    return Array.from(s);
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
          <div>
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

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant={selectedTag === null ? "outline" : "ghost"}
            onClick={() => setSelectedTag(null)}
            className="h-9"
          >
            Tất cả
          </Button>
          {allTags.map((t) => (
            <Badge
              key={t}
              onClick={() => setSelectedTag((s) => (s === t ? null : t))}
              className={`cursor-pointer px-3 py-1 text-sm ${
                selectedTag === t ? "ring-2 ring-offset-1" : ""
              }`}
            >
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <Separator />

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="md:flex h-full">
                    <div className="relative md:w-44 aspect-square flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4">
                      <CardHeader className="p-0 h-[70%]">
                        <CardTitle className="text-lg">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <div className="mt-3 flex justify-between">
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex-[3]">
                          <div>{article.author}</div>
                          <div>
                            {format(new Date(article.date), "dd MMM yyyy")}
                          </div>
                        </div>

                        <div className="flex justify-between items-start flex-[7]">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                              <Badge key={tag} className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-6 text-center text-slate-500">
                Không tìm thấy bài viết phù hợp.
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <Card className="p-2">
              <CardContent>
                <h3 className="font-semibold text-xl">Bài nổi bật</h3>
                <ScrollArea className="h-full mt-3">
                  <div className="space-y-3">
                    {sampleArticles.slice(0, 4).map((a) => (
                      <div key={a.id} className="flex items-start gap-3">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-14 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="text-sm font-medium">{a.title}</div>
                          <div className="text-xs text-slate-500">
                            {format(new Date(a.date), "dd MMM yyyy")}
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
    </div>
  );
}
