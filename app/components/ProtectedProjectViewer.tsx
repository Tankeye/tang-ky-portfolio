"use client";

import { useEffect } from "react";

const pageImages = Array.from(
  { length: 11 },
  (_, index) => `/projects/ai-shopping/page-${String(index + 1).padStart(2, "0")}.jpg?v=2`,
);

export default function ProtectedProjectViewer() {
  useEffect(() => {
    const preventDefault = (event: Event) => event.preventDefault();
    const preventSave = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && ["s", "p", "u"].includes(key)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("keydown", preventSave);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("keydown", preventSave);
    };
  }, []);

  return (
    <main className="project-viewer" onContextMenu={(event) => event.preventDefault()}>
      <header className="project-viewer-header">
        <a href="/#work" aria-label="返回作品集项目列表">← 返回作品集</a>
        <div>
          <strong>AI导购全流程体验升级</strong>
          <span>PROJECT CASE · 11 PAGES</span>
        </div>
        <small>VIEW ONLY</small>
      </header>

      <section className="project-pages" aria-label="AI导购全流程体验升级项目内容">
        {pageImages.map((src, index) => (
          <figure key={src}>
            <img
              src={src}
              alt={`AI导购全流程体验升级项目第 ${index + 1} 页`}
              draggable={false}
              loading={index < 2 ? "eager" : "lazy"}
            />
            <figcaption>{String(index + 1).padStart(2, "0")} / 11</figcaption>
          </figure>
        ))}
      </section>

      <footer className="project-viewer-footer">
        <span>© TANG KY</span>
        <span>本页面仅用于个人作品展示</span>
      </footer>
    </main>
  );
}
