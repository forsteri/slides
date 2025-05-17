# Markdown スライド管理・公開アプリ

## 概要

- Markdown でスライドを書き、Marp で HTML/PDF に変換し、React アプリで一覧表示・公開するプロジェクトです。
- GitHub Pages で静的サイトとしてスライドを公開できます。

## 必要な環境

- Node.js 20 系
- npm
- （推奨）VS Code + DevContainer

## 使い方

### 1. スライド作成

- `src/slides/` 配下に `YYYYMMDD-title.md` 形式で Markdown ファイルを作成します。
- Marp のフロントマター（`--- marp: true ---` など）を記述してください。

### 2. スライドのビルド

- HTML/PDF 化: `npm run build:slides`
  - `public/slides/` に公開用、`public/drafts/` に下書き用が出力されます。
  - ステータスは Markdown の frontmatter で `status: draft` を指定するとドラフト扱いになります。

### 3. React アプリのビルド・確認

- 開発サーバー起動: `npm run dev`
- 本番ビルド: `npm run build`
- ビルド後のプレビュー: `npm run preview`

### 4. 公開

- main ブランチに push すると GitHub Actions で自動的にビルド・デプロイされ、GitHub Pages で公開されます。
- 公開 URL はリポジトリの設定に依存します（例: `https://ユーザー名.github.io/リポジトリ名/`）。

## ディレクトリ構成（抜粋）

/
├── .devcontainer/ # VS Code 開発コンテナの設定
│ ├── Dockerfile # 開発環境の Dockerfile
│ └── devcontainer.json # 開発コンテナの設定ファイル
│
├── public/ # 静的ファイル
│ ├── slides/ # 公開済みスライド（HTML, PDF）
│ └── drafts/ # 下書きスライド（HTML, PDF）【gitignore に含める】
│
├── scripts/ # スクリプト
│ └── build-slides.js # スライドのビルドスクリプト
│
├── src/ # ソースコード
│ ├── components/ # React コンポーネント
│ │ └── SlideList.jsx # スライド一覧表示コンポーネント
│ │
│ ├── data/ # データファイル
│ │ ├── slides.json # 公開済みスライド情報
│ │ └── drafts.json # 下書きスライド情報【gitignore に含める】
│ │
│ ├── slides/ # Markdown で書かれたスライドファイル
│ │ ├── 20250216-sample-slide.md
│ │ ├── 20250217-another-sample.md
│ │ └── 20250218-third-sample.md
│ │
│ ├── App.jsx # メインの React コンポーネント
│ ├── index.css # グローバル CSS（Tailwind CSS の設定）
│ └── main.jsx # エントリーポイント
│
├── index.html # メインの HTML ファイル
├── package.json # npm 設定とスクリプト
├── package-lock.json # 依存関係のロックファイル
├── postcss.config.js # PostCSS の設定ファイル
├── README.md # プロジェクトの説明
├── tailwind.config.js # Tailwind CSS の設定
└── vite.config.js # Vite の設定

## 技術スタック・主な依存

- Marp CLI / Marp Core
- React, Vite, Tailwind CSS
- GitHub Actions（CI/CD）

## 備考

- `public/drafts/` と `src/data/drafts.json` は `.gitignore` で管理され、公開されません。
- スライドのタイトルや日付は、frontmatter（`title`, `date`）があればそれを、なければファイル名から自動生成されます。

## GitHub Actions による自動デプロイについて

- main ブランチに push すると、GitHub Actions（`.github/workflows/deploy.yml`）が自動で以下を実行します：
  1. 依存パッケージ・フォント・Chrome のセットアップ
  2. `npm run build:slides` で Markdown スライドを HTML/PDF に変換
  3. `npm run build` で React アプリをビルド（`dist/`に出力）
  4. `dist/`ディレクトリを GitHub Pages へデプロイ
- 公開 URL はリポジトリの「Settings > Pages」から確認できます。
- 詳細なワークフローは `.github/workflows/deploy.yml` を参照してください。
