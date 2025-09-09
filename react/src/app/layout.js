// app/layout.js
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import UserProvider from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import CartSidebar from "@/app/Components/Content/Cart/cartSidebar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Cá cảnh",
  description: "Chào mừng bạn đến với trang web cá cảnh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <Header />
              {children}
              <Toaster />
              <Footer />
              <CartSidebar />
            </CartProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
