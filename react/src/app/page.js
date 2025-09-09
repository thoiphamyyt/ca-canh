"use client";
// // app/page.js
import Hero from "./Components/Content/hero";
import Product from "./Components/Content/product";
import Sale from "./Components/Content/sale";
import { useRouter } from "next/navigation";
import { useIdleLogout } from "hooks/useIdleLogout";

export default function HomePage() {
  const router = useRouter();

  // Khi logout -> chuyển về trang login
  useIdleLogout(() => {
    console.log("User idle > 1h -> auto logout");
    router.push("/login");
  });
  return (
    <section>
      <Hero />
      <Product />
      <Sale />
    </section>
  );
}
