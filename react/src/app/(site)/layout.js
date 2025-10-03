"use client";

import Header from "@/layout/user/Header";
import Footer from "@/layout/user/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import UserProvider from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import CartSidebar from "@/components/cart/cartSidebar";
import { Toaster } from "@/components/ui/toaster";

export default function SiteLayout({ children }) {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CartProvider>
          <Header />
          <div className="bg-sky-100 dark:bg-black">{children}</div>
          <Toaster />
          <Footer />
          <CartSidebar />
        </CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
