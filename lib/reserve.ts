import { toText } from "./utils";

/**
 * 予約モード判定・予約URL取得
 * 管理画面(microCMS)の reserveMode / reserveUrl に依存
 */

export type ReserveMode = "link" | "form";

export function getReserveUrl(mode: unknown, url?: unknown): string | null {
  const modeStr = toText(mode);
  const urlStr = toText(url);
  if (modeStr === "link" && urlStr) return urlStr;
  return null;
}

/** フォーム送信先: 環境変数で切替（Resend / Formspree / ダミー） */
export const RESERVE_FORM_ACTION = process.env.NEXT_PUBLIC_RESERVE_FORM_ACTION ?? "";
export const RESERVE_USE_DUMMY = process.env.RESERVE_USE_DUMMY === "true";
