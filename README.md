# 仕様まとめ

## 全体の概要

このプロジェクトは、Markdown で書いたスライドを Marp を使って HTML と PDF に変換し、Web サイトで一覧表示して閲覧できるようにするシステムです。下書き（ドラフト）機能もサポートしており、スライドの執筆プロセスをより効率的に管理できます。

## 開発環境

- **Docker**を使った開発環境（.devcontainer フォルダにある設定）
  - Node.js 20 をベースイメージとして使用
  - Chromium, 日本語フォント(fonts-noto-cjk)をインストール済み
  - Marp の実行環境として必要な設定が済んでいる
- **VS Code**の拡張機能として、ESLint, Prettier, Marp VSCode を使用

## フロントエンド

- **React 18**と**Tailwind CSS**を使用した SPA
- **Vite**をビルドツールとして使用
- **Lucide React**をアイコンライブラリとして使用

## スライド管理

- ファイル名の命名規則: `YYYYMMDD-タイトル.md`（例: `20250216-sample-slide.md`）
- スライドファイルは`src/slides`ディレクトリに保存
- Marp の形式で書かれた Markdown ファイル
- ビルド時に自動的に HTML 版と PDF 版が生成される
- **ドラフト機能**: スライドのフロントマターに`status: draft`を設定することで下書き状態を指定可能

## ドラフト機能

- スライドを公開前に下書き状態で作成・編集できる機能
- 下書きスライドは Web サイトに表示されず、開発時のみ確認可能
- フロントマターに`status: draft`を追加するだけで下書きモードになる
- 下書きスライドは`public/drafts/`ディレクトリに生成され、公開サイトではアクセス不可
- `src/data/drafts.json`ファイルに下書き情報が保存される（gitignore に含める）

## ビルドプロセス

- `npm run build:slides`コマンドで実行
- `scripts/build-slides.js`がビルドを担当
  - 新しいスライドや変更があったスライドのみビルド（既存のファイルは再ビルドしない）
  - HTML と PDF 両方のバージョンを生成
  - 公開済みスライドは`public/slides/`ディレクトリに出力
  - ドラフト（下書き）スライドは`public/drafts/`ディレクトリに出力
  - 公開済みスライド情報を`src/data/slides.json`に保存（日付降順でソート）
  - ドラフトスライド情報を`src/data/drafts.json`に保存（gitignore に含める）
  - 使用されなくなったファイルは自動的に削除
  - 最終ビルド時には drafts ディレクトリは含まれない

## フロントエンドの機能

- トップページに公開済みスライドのリストを表示
- 各スライドエントリには:
  - 日付（YYYY/MM/DD 形式）
  - タイトル
  - 「スライドを閲覧」ボタン（HTML 版をブラウザで開く）
  - 「PDF をダウンロード」ボタン

## npm スクリプト

- `npm run dev`: 開発サーバーを起動（Vite）
- `npm run build`: Vite でフロントエンドをビルド
- `npm run preview`: ビルド後のプレビュー表示
- `npm run build:slides`: スライドを HTML と PDF にビルド

## デプロイ

- GitHub Pages での公開を前提とした設計
- ビルド済みの HTML と PDF が`public/slides`に格納される
- 下書きスライドは公開されない仕組み

## スライドの作成と公開ワークフロー

1. `src/slides/`ディレクトリに新しい Markdown ファイルを作成
2. フロントマターに`status: draft`を追加して下書き状態で作業
3. `npm run build:slides`を実行してビルド
4. 下書きを確認するには直接`public/drafts/`内のファイルを開く
5. 完成したらフロントマターから`status: draft`を削除（または`status: published`に変更）
6. 再度ビルドして公開

## スライドのフロントマター例

```markdown
---
marp: true
theme: default
title: サンプルスライド
status: draft # draft（下書き）または published（公開）。省略時はpublished
---
```

## gitignore に追加すべき項目

```
# ドラフトスライド関連ファイルを除外
public/drafts/
src/data/drafts.json
```

## ディレクトリ構成

```
/
├── .devcontainer/                 # VS Code開発コンテナの設定
│   ├── Dockerfile                 # 開発環境のDockerfile
│   └── devcontainer.json          # 開発コンテナの設定ファイル
│
├── public/                        # 静的ファイル
│   ├── slides/                    # 公開済みスライド（HTML, PDF）
│   └── drafts/                    # 下書きスライド（HTML, PDF）【gitignoreに含める】
│
├── scripts/                       # スクリプト
│   └── build-slides.js            # スライドのビルドスクリプト
│
├── src/                           # ソースコード
│   ├── components/                # Reactコンポーネント
│   │   └── SlideList.jsx          # スライド一覧表示コンポーネント
│   │
│   ├── data/                      # データファイル
│   │   ├── slides.json            # 公開済みスライド情報
│   │   └── drafts.json            # 下書きスライド情報【gitignoreに含める】
│   │
│   ├── slides/                    # Markdownで書かれたスライドファイル
│   │   ├── 20250216-sample-slide.md
│   │   ├── 20250217-another-sample.md
│   │   └── 20250218-third-sample.md
│   │
│   ├── App.jsx                    # メインのReactコンポーネント
│   ├── index.css                  # グローバルCSS（Tailwind CSSの設定）
│   └── main.jsx                   # エントリーポイント
│
├── index.html                     # メインのHTMLファイル
├── package.json                   # npm設定とスクリプト
├── package-lock.json              # 依存関係のロックファイル
├── postcss.config.js              # PostCSSの設定ファイル
├── README.md                      # プロジェクトの説明
├── tailwind.config.js             # Tailwind CSSの設定
└── vite.config.js                 # Viteの設定
```
