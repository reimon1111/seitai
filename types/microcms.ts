/** microCMS 共通 */
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSRichText = {
  fieldId: string;
  html: string;
};

/** 安心材料バッジ（siteSettings 内） */
export type TrustBadge = {
  fieldId: string;
  label: string;
  icon?: string;
};

/** トップスライダー1枚分（site-settings の繰り返し or hero-slides リスト） */
export type HeroSlide = {
  id?: string;
  image: MicroCMSImage;
  catchCopy: string;
  subCopy: string;
  order?: number;
};

/** サイト設定（単一） API ID: site-settings */
export type SiteSettings = {
  /** 院名（必須）。ロゴ未設定時はヘッダーにこのテキストを表示 */
  clinicName: string;
  tagline?: string;
  phone: string;
  address: string;
  businessHours: string;
  holiday?: string;
  areaText?: string;
  googleMapUrl?: string;
  reserveMode: "link" | "form";
  reserveUrl?: string;
  instagramUrl?: string;
  lineUrl?: string;
  heroImage?: MicroCMSImage;
  /** ロゴ画像（任意）。フィールドIDが logo の場合はこちらを使用 */
  logo?: MicroCMSImage;
  /** ロゴ画像（任意）。フィールドIDが logoImage の場合用。logo があれば logo を優先 */
  logoImage?: MicroCMSImage;
  trustBadges?: TrustBadge[];
  /** トップスライダー（繰り返しフィールド ID: heroSlides） */
  heroSlides?: HeroSlide[];
  /** コンセプト画像（未設定時はデフォルト画像） */
  conceptImage?: MicroCMSImage;
  /** コンセプト説明文（未設定時はデフォルト文言） */
  conceptText?: string;
  /** メニュー・料金ページの冒頭説明（未設定時は非表示） */
  menuPageIntro?: string;
  /** お客様の声ページの冒頭説明（未設定時は非表示） */
  testimonialsIntro?: string;
  /** 施術者ページの冒頭説明（未設定時は非表示） */
  staffPageIntro?: string;
  /** アクセスページの冒頭説明（未設定時は非表示） */
  accessPageIntro?: string;
  /** フッターのコピーライト（例: © 2024 院名） */
  copyright?: string;
};

/** こんな方におすすめ 1件（リスト） API ID: for-whom */
export type ForWhomItem = {
  id: string;
  title: string;
  text: string;
  image?: MicroCMSImage;
  order: number;
};

/** 選ばれる理由 1件（リスト） API ID: why-us */
export type WhyUsItem = {
  id: string;
  title: string;
  text?: string;
  image?: MicroCMSImage;
  order: number;
};

/** メニュー（リスト） API ID: menus */
export type Menu = {
  id: string;
  title: string;
  priceText: string;
  description?: string;
  /** メニュー用画像（任意） */
  image?: MicroCMSImage;
  order: number;
  isFeatured?: boolean;
};

/** お客様の声（リスト） API ID: testimonials */
export type Testimonial = {
  id: string;
  nameMask: string;
  comment: string;
  rating?: number;
  order: number;
  /** トップに表示するか（true のものだけトップに表示） */
  isFeatured?: boolean;
};

/** スタッフ（リスト） API ID: staff */
export type Staff = {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: MicroCMSImage;
  qualifications?: string[];
  message?: string;
  order?: number;
};

/** API レスポンス（リスト用） */
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
