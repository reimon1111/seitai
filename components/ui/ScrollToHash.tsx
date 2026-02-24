"use client";

import { useEffect } from "react";

/**
 * トップページで URL のハッシュ（#concept, #for-whom, #why-us）に該当する要素へスクロールする。
 * 他ページから「こんな方に」「選ばれる理由」等で遷移したときに正しくスクロールするため。
 */
export function ScrollToHash() {
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;

    const scrollToEl = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // クライアント遷移直後は DOM がまだ揃っていないことがあるので少し遅延
    const t = setTimeout(scrollToEl, 150);
    return () => clearTimeout(t);
  }, []);

  return null;
}
