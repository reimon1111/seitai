/**
 * ビルド前に microCMS 用の環境変数が設定されているか確認する。
 * 未設定の場合は警告のみ出してビルドは続行（Netlify で後から環境変数を入れてもよい）。
 * 設定済みの場合は API に問い合わせて値が正しいか確認する。
 */
const fs = require("fs");
const path = require("path");

// ローカルで npm run build するときは .env.local を読む（Netlify では process.env に既に入っている）
if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*MICROCMS_(SERVICE_DOMAIN|API_KEY)\s*=\s*(.+)\s*$/);
      if (m) process.env["MICROCMS_" + m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  }
}

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!domain || typeof domain !== "string" || domain.trim() === "") {
  console.warn("\n[check-env] MICROCMS_SERVICE_DOMAIN が未設定です。ビルドは続行します。");
  console.warn("本番で microCMS を表示する場合は、Vercel の Settings → Environment variables で設定してください。\n");
  process.exit(0);
}

if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
  console.warn("\n[check-env] MICROCMS_API_KEY が未設定です。ビルドは続行します。");
  console.warn("本番で microCMS を表示する場合は、Vercel の Settings → Environment variables で設定してください。\n");
  process.exit(0);
}

async function checkMicroCms() {
  const baseUrl = `https://${domain.trim()}.microcms.io/api/v1`;
  const url = `${baseUrl}/site-settings`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "X-MICROCMS-API-KEY": apiKey.trim() },
    });

    if (res.ok) {
      console.log("[check-env] microCMS の環境変数は正しく設定されています。");
      return;
    }
    if (res.status === 401 || res.status === 403) {
      console.warn("\n[check-env] microCMS API が 401/403 を返しました。API キーを確認してください。ビルドは続行します。\n");
      return;
    }
    if (res.status === 404) {
      console.warn("\n[check-env] microCMS で site-settings が見つかりません (404)。ビルドは続行します。\n");
      return;
    }
    console.warn("\n[check-env] microCMS API がエラーを返しました:", res.status, "ビルドは続行します。\n");
  } catch (err) {
    console.warn("\n[check-env] microCMS への接続に失敗しました:", err.message, "ビルドは続行します。\n");
  }
}

checkMicroCms();
