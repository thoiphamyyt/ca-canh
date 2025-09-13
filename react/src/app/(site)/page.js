"use client";
// // app/page.js
import Hero from "../../layout/user/hero";
import Product from "../../layout/user/product";
import Sale from "../../layout/user/sale";
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
