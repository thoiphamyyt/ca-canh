import "./globals.css";

export const metadata = {
  title: "Cá cảnh",
  description: "Chào mừng bạn đến với trang web cá cảnh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
