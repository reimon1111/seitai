import { getOrderFromItem } from "@/lib/utils";
import type {
  SiteSettings,
  Menu,
  Testimonial,
  Staff,
  ForWhomItem,
  WhyUsItem,
} from "@/types/microcms";

const REVALIDATE = 60; // 秒

function getFetchOptions(): RequestInit {
  return {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY ?? "",
    },
    next: { revalidate: REVALIDATE },
  };
}

function getBaseUrl(): string | null {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  if (!domain || typeof domain !== "string") return null;
  return `https://${domain}.microcms.io/api/v1`;
}

/** サイト設定（単一） */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return null;
  try {
    const res = await fetch(`${baseUrl}/site-settings`, getFetchOptions());
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || typeof data !== "object") return null;
    return data as SiteSettings;
  } catch {
    return null;
  }
}

/** メニュー一覧（order 昇順、featured 優先はクライアントでソート可） */
export async function getMenus(): Promise<Menu[]> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(
      `${baseUrl}/menus?limit=100&orders=order`,
      getFetchOptions()
    );
    if (!res.ok) return [];
    const data = await res.json();
    const contents = Array.isArray(data?.contents) ? data.contents : [];
    const orderNum = (m: { order?: unknown }) => {
      const o = m.order;
      if (o == null) return 0;
      const n = Number(o);
      return Number.isFinite(n) ? n : 0;
    };
    return contents.sort((a: Menu, b: Menu) => orderNum(a) - orderNum(b));
  } catch {
    return [];
  }
}

/** お客様の声（最大3件・トップ用） */
export async function getTestimonials(limit = 3): Promise<Testimonial[]> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(
      `${baseUrl}/testimonials?limit=${limit}&orders=order`,
      getFetchOptions()
    );
    if (!res.ok) return [];
    const data = await res.json();
    const contents = Array.isArray(data?.contents) ? data.contents : [];
    return contents.sort((a: Testimonial, b: Testimonial) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}

/** スタッフ一覧（order 昇順） */
export async function getStaff(): Promise<Staff[]> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/staff?limit=50&orders=order`, getFetchOptions());
    if (!res.ok) return [];
    const data = await res.json();
    const contents = Array.isArray(data?.contents) ? data.contents : [];
    return contents.sort(
      (a: Staff, b: Staff) =>
        getOrderFromItem(a as Record<string, unknown>) - getOrderFromItem(b as Record<string, unknown>)
    );
  } catch {
    return [];
  }
}

/** こんな方におすすめ（for-whom リスト） */
export async function getForWhom(): Promise<ForWhomItem[]> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(
      `${baseUrl}/for-whom?limit=20&orders=order`,
      getFetchOptions()
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.contents) ? data.contents : [];
  } catch {
    return [];
  }
}

/** 選ばれる理由（why-us リスト） */
export async function getWhyUs(): Promise<WhyUsItem[]> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) return [];
  try {
    const res = await fetch(
      `${baseUrl}/why-us?limit=20&orders=order`,
      getFetchOptions()
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.contents) ? data.contents : [];
  } catch {
    return [];
  }
}
