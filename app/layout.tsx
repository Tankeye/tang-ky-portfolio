import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "汤开杨｜产品体验设计师",
  description: "汤开杨的产品体验设计作品集——研究、产品与视觉之间的连接。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
