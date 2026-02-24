/**
 * microCMS の画像フィールドから URL を取得する。
 * オブジェクト { url } または文字列で返る場合に対応。
 */
export function getImageUrl(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (typeof value === "object" && value !== null && "url" in value) {
    const u = (value as { url: unknown }).url;
    return typeof u === "string" && u.trim() !== "" ? u.trim() : "";
  }
  return "";
}

/**
 * 表示順 order を数値に正規化する（API が文字列で返す場合に対応）。
 */
export function getOrder(value: unknown): number {
  if (value == null) return 0;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

/**
 * オブジェクトから表示順の数値を取得（order, sortOrder 等のキーを試す）。数値が小さいほど先頭。未入力・空は末尾。
 */
export function getOrderFromItem(item: Record<string, unknown>): number {
  const o = item.order ?? item.sortOrder ?? item["表示順"];
  if (o == null) return 999999;
  if (typeof o === "string" && o.trim() === "") return 999999;
  const n = getOrder(o);
  return Number.isFinite(n) ? n : 999999;
}

/**
 * お客様の声の rating（星の数）を 0〜5 の数値に正規化する。
 * 数値・文字列・配列（microCMS のセレクト等）・未設定に対応。
 */
export function getRating(value: unknown): number {
  if (value == null) return 0;
  const v = Array.isArray(value) && value.length > 0 ? value[0] : value;
  if (v == null) return 0;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.min(5, Math.max(0, Math.round(n)));
}

/**
 * microCMS が返すテキストを文字列に正規化する。
 * 文字列のほか、{ fieldId, text } や { fieldId, html } の形で返ることがある。
 */
export function toText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "text" in value) {
    const v = (value as { text: unknown }).text;
    return typeof v === "string" ? v : "";
  }
  return "";
}

/**
 * microCMS のリッチテキスト／テキストを HTML 文字列として取得。
 * 文字列 or { fieldId, html } or { fieldId, text } に対応。
 */
export function toHtml(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object" || value === null) return "";
  if ("html" in value && typeof (value as { html: unknown }).html === "string")
    return (value as { html: string }).html;
  if ("text" in value && typeof (value as { text: unknown }).text === "string")
    return (value as { text: string }).text;
  return "";
}
