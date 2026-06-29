"use client";

import { useEffect } from "react";

export function TocScrollSpy() {
  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>("[data-toc]");
    if (headings.length === 0) return;

    const links = document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]");
    if (links.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            const isActive = link.dataset.tocLink === id;
            link.classList.toggle("text-primary", isActive);
            link.classList.toggle("font-medium", isActive);
            link.classList.toggle("border-primary", isActive);
          });
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return null;
}
