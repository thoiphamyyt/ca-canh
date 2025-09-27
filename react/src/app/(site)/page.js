"use client";
// // app/page.js
import Hero from "../../layout/user/Hero";
import Product from "../../layout/user/Product";
import Sale from "../../layout/user/Sale";
import { useRouter } from "next/navigation";
import { useIdleLogout } from "hooks/useIdleLogout";
import ArticleList from "../../layout/user/ArticleList";

export default function HomePage() {
  const router = useRouter();

  // Khi logout -> chuyển về trang login
  useIdleLogout(() => {
    router.push("/login");
  });
  return (
    <section>
      <Hero />
      <Product />
      <ArticleList />
      <Sale />
    </section>
  );
}
