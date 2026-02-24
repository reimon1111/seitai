# 整体院スタートHP

整体院・整骨院・個人サロン向けの Next.js テンプレートです。表示速度とスマホでの予約導線を重視し、microCMS でコンテンツを管理します。

## すぐに http://127.0.0.1:3004/ で開く

```bash
cd /Users/aokireimon/Desktop/work/seitai
npm run dev:fresh
```

上記のあと、ブラウザで **http://127.0.0.1:3004/** を開いてください。  
（ポートが塞がっている場合は `dev:fresh` が解放してから起動します。通常起動なら `npm run dev` でも可。）

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- microCMS
- Framer Motion（軽量・prefers-reduced-motion 対応）
- next/image / next/font

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数

`.env.example` をコピーして `.env.local` を作成し、値を設定してください。

```bash
cp .env.example .env.local
```

| 変数名 | 説明 |
|--------|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン（例: `xxxx` → `xxxx.microcms.io`） |
| `MICROCMS_API_KEY` | microCMS の API キー（API キー設定で取得） |
| `NEXT_PUBLIC_SITE_URL` | 本番のサイト URL（sitemap / robots / JSON-LD 用） |
| `RESERVE_USE_DUMMY` | `true` の場合、予約フォーム送信をダミー扱い（開発用） |
| `NEXT_PUBLIC_RESERVE_USE_DUMMY` | クライアント側でダミー送信を使うか（フォーム送信時に即成功表示） |
| `RESERVE_FORM_ACTION` | 本番時のフォーム送信先 URL（Formspree 等） |

### 3. 開発サーバー起動

```bash
npm run dev
```

起動したら、ブラウザで **http://127.0.0.1:3004/** を開いてください（このプロジェクトはポート **3004** で起動します）。  
※ `/` 以外の存在しないURLにアクセスすると「ページが見つかりません」と表示されます。

**「address already in use」「EADDRINUSE」と出て起動できない場合**

- ポート 3004 が既に使われています。次を実行してから再度 `npm run dev` を実行してください：
  ```bash
  npm run dev:fresh
  ```
  （3004 を使っているプロセスを終了してから開発サーバーを起動します）

**トップが表示されない・500エラー・「ページが見つかりません」になる場合**

1. **まず本番モードで表示を確認する**（推奨）  
   開発サーバーではなく、ビルドしてから本番サーバーで開く：
   ```bash
   npm run build
   npm start
   ```
   ブラウザで **http://127.0.0.1:3000/** を開く（`npm start` は標準で 3000 番ポート）。

2. **開発サーバーを使う場合**  
   開発サーバーを一度止めてから、キャッシュ削除して再起動：
   ```bash
   rm -rf .next
   npm run dev
   ```
   その後 **http://127.0.0.1:3004/** を開く。

3. **Macで「too many open files」と出る場合**  
   ターミナルで `ulimit -n 10240` を実行してから `npm run dev` を実行する。

### 4. ビルド・本番起動

```bash
npm run build
npm start
```

---

## 次のステップ（開発の流れ）

| 順番 | やること | 詳細 |
|------|----------|------|
| **1** | 開発サーバーで表示確認 | `npm run dev` で起動し、**http://127.0.0.1:3004/** でトップを開く |
| **2** | microCMS にコンテンツを入れる | 下記「2-1〜2-4」を順に実施 |
| **3** | ブラウザで反映を確認 | 院名・キャッチ・メニュー・お客様の声が表示されているか確認 |
| **4** | 予約のやり方を決める | リンク方式 or フォーム方式 → 「予約モードの切替方法」を参照 |
| **5** | 必要ならデザイン調整 | Tailwind のクラスや `app/globals.css` を編集 |
| **6** | 本番デプロイ | Vercel にデプロイし、**環境変数**（`MICROCMS_SERVICE_DOMAIN`・`MICROCMS_API_KEY`・`NEXT_PUBLIC_SITE_URL`）を設定。手順は「Vercel でのデプロイ」を参照 |

### 2. microCMS にコンテンツを入れる（次のステップの中心）

- **2-1. サイト設定（site-settings）** … 1件だけ。院名・電話・住所・営業時間・予約モード・予約URL などを入力。
- **2-2. メニュー（menus）** … 施術メニューを複数登録。タイトル・料金・説明・表示順・「トップで表示」の有無。
- **2-3. お客様の声（testimonials）** … 口コミを数件。表記名（例: 40代女性）・コメント・表示順。
- **2-4. スタッフ（staff）** … 施術者を登録。名前・役職・経歴・写真・資格など。

---

## microCMS モデル作成手順

microCMS 管理画面で以下の API を作成し、**API ID** と **フィールド ID** を下記のとおりにしてください。

### (1) サイト設定（単一） — API ID: `site-settings`

1 コンテンツのみの「単一コンテンツ」で作成します。

| フィールド ID | 種類 | 必須 | 備考 |
|---------------|------|------|------|
| `clinicName` | テキスト | ○ | 院名（必須）。ロゴ未設定時はヘッダーにこのテキストを表示 |
| `tagline` | テキスト | - | キャッチコピー（トップのメイン文言） |
| `phone` | テキスト | ○ | 電話番号 |
| `address` | テキスト | ○ | 住所 |
| `businessHours` | テキストエリア | ○ | 営業時間 |
| `holiday` | テキスト | - | 定休日 |
| `areaText` | テキスト | - | 例: 長野市 |
| `googleMapUrl` | テキスト | - | Google マップ埋め込み用 URL |
| `reserveMode` | 選択 | ○ | 選択肢: `link` / `form` |
| `reserveUrl` | テキスト | - | 予約リンク（reserveMode が link のとき） |
| `instagramUrl` | テキスト | - | Instagram の URL |
| `lineUrl` | テキスト | - | LINE の URL |
| `heroImage` | 画像 | - | トップのヒーロー画像 |
| `logo` または `logoImage` | 画像 | - | ヘッダー・フッター用ロゴ（任意）。フィールドIDは `logo` または `logoImage` のどちらか。設定時はロゴのみ表示し院名テキストは使わない |
| `conceptImage` | 画像 | - | トップ「コンセプト」セクションの画像（未設定時はデフォルト画像） |
| `conceptText` | テキストエリア | - | トップ「コンセプト」の説明文（未設定時はデフォルト文言） |
| `menuPageIntro` | テキストエリア | - | メニュー・料金ページの冒頭説明（未設定時は非表示） |
| `testimonialsIntro` | テキストエリア | - | お客様の声ページの冒頭説明（未設定時は非表示） |
| `staffPageIntro` | テキストエリア | - | 施術者ページの冒頭説明（未設定時は非表示） |
| `accessPageIntro` | テキストエリア | - | アクセスページの冒頭説明（未設定時は非表示） |
| `heroSlides` | 繰り返し | - | トップのフルスクリーンスライダー（下記のサブフィールド） |
| `trustBadges` | 繰り返し | - | 安心材料（下記のサブフィールド） |

**heroSlides（繰り返しのサブフィールド）**

| フィールド ID | 種類 | 備考 |
|---------------|------|------|
| `image` | 画像 | スライド背景画像 |
| `catchCopy` | テキスト | 1行目キャッチコピー |
| `subCopy` | テキスト | 2行目キャッチコピー |

**trustBadges（繰り返しのサブフィールド）**

| フィールド ID | 種類 |
|---------------|------|
| `label` | テキスト（例: 国家資格保有） |
| `icon` | テキスト（任意・絵文字など） |

### (2) メニュー — API ID: `menus`

リスト形式で作成します。

| フィールド ID | 種類 | 必須 | 備考 |
|---------------|------|------|------|
| `title` | テキスト | ○ | メニュー名 |
| `priceText` | テキスト | ○ | 例: 3,000円〜 |
| `description` | テキストエリア または リッチエディタ | - | 説明 |
| `image` | 画像 | - | メニュー・料金ページで表示（未設定時は画像なし） |
| `order` | 数値 | ○ | 表示順（昇順） |
| `isFeatured` | 真偽値 | - | トップで優先表示 |

### (3) お客様の声 — API ID: `testimonials`

リスト形式で作成します。

| フィールド ID | 種類 | 必須 | 備考 |
|---------------|------|------|------|
| `nameMask` | テキスト | ○ | 例: 40代女性 |
| `comment` | テキストエリア または リッチエディタ | ○ | 口コミ本文（改行はそのまま表示） |
| `rating` | 数値 | - | 1〜5 など（星の数） |
| `order` | 数値 | ○ | 表示順 |
| `isFeatured` | 真偽値 | - | トップに表示する（ON のものだけトップに表示） |

### (4) こんな方におすすめ — API ID: `for-whom`

リスト形式で作成します。

| フィールド ID | 種類 | 必須 | 備考 |
|---------------|------|------|------|
| `title` | テキスト | ○ | 見出し（例: 慢性的な肩こりに悩んでいる方） |
| `text` | テキストエリア | ○ | 説明文 |
| `image` | 画像 | - | 写真（未設定時はプレースホルダー） |
| `order` | 数値 | ○ | 表示順 |

### (5) 選ばれる理由 — API ID: `why-us`

リスト形式で作成します。

| フィールド ID | 種類 | 必須 | 備考 |
|---------------|------|------|------|
| `title` | テキスト | ○ | 見出し（例: 国家資格保有） |
| `text` | テキストエリア | - | 説明文 |
| `image` | 画像 | - | 写真（未設定時はプレースホルダー） |
| `order` | 数値 | ○ | 表示順（01, 02, 03 は自動） |

### (6) スタッフ — API ID: `staff`

リスト形式で作成します（1件だけでも可）。

| フィールド ID | 種類 | 必須 | 備考 |
|---------------|------|------|------|
| `name` | テキスト | ○ | 氏名 |
| `role` | テキスト | - | 役職・肩書 |
| `bio` | テキストエリア または リッチエディタ | - | 経歴（改行はそのまま表示） |
| `photo` | 画像 | - | 写真 |
| `qualifications` | テキスト（複数） | - | 資格名 |
| `message` | テキストエリア | - | ひとこと（改行はそのまま表示） |
| `order` | 数値 | - | 表示順（昇順）。**フィールドIDは必ず `order` にすること**（トップ・施術者ページの並びに反映） |

---

## 予約モードの切替方法

予約の挙動は microCMS の **サイト設定（site-settings）** の `reserveMode` で切り替えます。

### A. 外部予約リンク方式（推奨・最速）

1. microCMS のサイト設定で `reserveMode` を **link** に設定する。
2. `reserveUrl` に LINE・Google 予約・予約サイトなどの URL を入力する。
3. すべての「予約」ボタンがその URL へ遷移する（必要に応じて `target="_blank"`）。

### B. 予約リクエストフォーム方式

1. microCMS のサイト設定で `reserveMode` を **form** に設定する。
2. `/reserve` に予約希望フォームが表示され、送信先は環境変数で制御する。
   - **開発時**: `.env.local` で `RESERVE_USE_DUMMY=true` および `NEXT_PUBLIC_RESERVE_USE_DUMMY=true` にすると、送信せずに成功扱い。
   - **本番**: `RESERVE_FORM_ACTION` に Formspree 等の URL を設定すると、フォーム内容がその URL に POST される。Resend 等でメール送信する場合は `app/api/reserve/route.ts` 内で実装を追加する。

---

## Git と GitHub への連携

このプロジェクトは **seitai フォルダ単体**で Git リポジトリになっています。Vercel でデプロイするには、GitHub にプッシュしたリポジトリを連携します。

### 1. GitHub でリポジトリを作成する

1. [GitHub](https://github.com/) にログインし、**New repository** をクリックする。
2. **Repository name** を入力（例: `seitai`）。
3. **Public** を選び、**Add a README file** にはチェックを入れずに **Create repository** をクリックする。

### 2. リモートを追加してプッシュする

ターミナルで **seitai フォルダ内**に移動して、以下を実行する（`YOUR_USERNAME` と `YOUR_REPO` は自分の GitHub ユーザー名とリポジトリ名に置き換える）。

```bash
cd /Users/aokireimon/Desktop/work/seitai

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

GitHub でリポジトリを **既に作成済み**で、別の URL を使う場合は `origin` の URL だけ変更してください。

### 3. 以降の更新の流れ

- 変更をコミット: `git add .` → `git commit -m "メッセージ"`
- GitHub にプッシュ: `git push`
- Vercel と連携していれば、`git push` のたびに自動でデプロイされます。

---

## Vercel でのデプロイ（microCMS 連携）

Vercel は Next.js の開発元が提供するホスティングで、設定が簡単です。デプロイ後、トップのコンテンツ（院名・メニュー・お客様の声・施術者など）が表示されない場合は、**環境変数が未設定**の可能性があります。

### 1. プロジェクトを Vercel に追加する

1. [Vercel](https://vercel.com/) にログイン（GitHub 等で連携するとスムーズです）。
2. **Add New** → **Project** を選び、Git リポジトリをインポートする。
3. **Framework Preset** は **Next.js** のまま、**Deploy** をクリックする（ビルドコマンド等は自動検出されます）。

### 2. 環境変数を設定する

1. プロジェクトの **Settings** → **Environment Variables** を開く。
2. 以下を **1つずつ** 追加する。

| 変数名 | 値 | 必須 |
|--------|-----|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービス ID（例: `clinic01`。`xxxx.microcms.io` の `xxxx` 部分） | ○ |
| `MICROCMS_API_KEY` | microCMS の API キー（管理画面 → 設定 → API キーで確認） | ○ |
| `NEXT_PUBLIC_SITE_URL` | 本番のサイト URL（例: `https://your-project.vercel.app`。デプロイ後に表示される URL でよい） | 推奨 |

3. **Environment** は **Production**（と必要なら Preview）にチェックを入れる。
4. **Save** で保存する。

**重要**: 環境変数は「保存しただけ」では反映されません。**再デプロイ**が必要です。

### 3. 再デプロイする

- **Deployments** タブを開く → 直近のデプロイの **⋯** メニュー → **Redeploy** をクリックする。  
- または手元で `git push` すると自動で新しいデプロイが走ります。

再デプロイが完了してから、サイトを開き直して microCMS のコンテンツが表示されるか確認してください。

### 予約フォームを本番で使う場合

フォーム送信を使う場合は、上記に加えて次の変数も Vercel の Environment Variables に設定してください。

| 変数名 | 値 |
|--------|-----|
| `RESERVE_USE_DUMMY` | 本番では未設定 or `false`（ダミー送信をオフにする） |
| `RESERVE_FORM_ACTION` | Formspree 等のフォーム送信先 URL |
| `NEXT_PUBLIC_RESERVE_USE_DUMMY` | 本番では未設定 or `false` |

---

## サイト構成

| パス | 説明 |
|------|------|
| `/` | トップ（スライダー・コンセプト・こんな方に・選ばれる理由・メニュー・お客様の声・施術者・アクセス・予約CTA） |
| `/menu` | メニュー・料金一覧 |
| `/testimonials` | お客様の声一覧 |
| `/staff` | 施術者紹介 |
| `/access` | アクセス・営業時間 |
| `/reserve` | 予約（リンク or フォーム） |
| `/privacy` | プライバシーポリシー（簡易） |

---

## ライセンス

MIT
