# 仕様まとめ

## 全体の概要
このプロジェクトは、Markdownで書いたスライドをMarpを使ってHTMLとPDFに変換し、Webサイトで一覧表示して閲覧できるようにするシステムです。

## 開発環境
- **Docker**を使った開発環境（.devcontainerフォルダにある設定）
  - Node.js 20をベースイメージとして使用
  - Chromium, 日本語フォント(fonts-noto-cjk)をインストール済み
  - Marpの実行環境として必要な設定が済んでいる
- **VS Code**の拡張機能として、ESLint, Prettier, Marp VSCodeを使用

## フロントエンド
- **React 18**と**Tailwind CSS**を使用したSPA
- **Vite**をビルドツールとして使用
- **Lucide React**をアイコンライブラリとして使用

## スライド管理
- ファイル名の命名規則: `YYYYMMDD-タイトル.md`（例: `20250216-sample-slide.md`）
- スライドファイルは`src/slides`ディレクトリに保存
- Marpの形式で書かれたMarkdownファイル
- ビルド時に自動的にHTML版とPDF版が生成される

## ビルドプロセス
- `npm run build:slides`コマンドで実行
- `scripts/build-slides.js`がビルドを担当
  - 新しいスライドや変更があったスライドのみビルド（既存のファイルは再ビルドしない）
  - HTMLとPDF両方のバージョンを生成
  - `public/slides/`ディレクトリに出力
  - すべてのスライド情報を`src/data/slides.json`に保存（日付降順でソート）

## フロントエンドの機能
- トップページにすべてのスライドのリストを表示
- 各スライドエントリには:
  - 日付（YYYY/MM/DD形式）
  - タイトル
  - 「スライドを閲覧」ボタン（HTML版をブラウザで開く）
  - 「PDFをダウンロード」ボタン

## npm スクリプト
- `npm run dev`: 開発サーバーを起動（Vite）
- `npm run build`: Viteでフロントエンドをビルド
- `npm run preview`: ビルド後のプレビュー表示
- `npm run build:slides`: スライドをHTMLとPDFにビルド

## デプロイ
- GitHub Pagesでの公開を前提とした設計
- ビルド済みのHTMLとPDFが`public/slides`に格納される

## その他
- スライドのファイル名からタイトルと日付を自動的に抽出
- 日付は降順（新しい順）で表示される

もちろん！現在のファイルから読み取れるディレクトリ構成をまとめるね。

# プロジェクトのディレクトリ構成

```
/
├── .devcontainer/                 # VS Code開発コンテナの設定
│   ├── Dockerfile                 # 開発環境のDockerfile
│   └── devcontainer.json          # 開発コンテナの設定ファイル
│
├── public/                        # 静的ファイル（ビルド後のスライドが格納される）
│   └── slides/                    # ビルドされたスライド（HTML, PDF）
│
├── scripts/                       # スクリプト
│   └── build-slides.js            # スライドのビルドスクリプト
│
├── src/                           # ソースコード
│   ├── components/                # Reactコンポーネント
│   │   └── SlideList.jsx          # スライド一覧表示コンポーネント
│   │
│   ├── data/                      # データファイル
│   │   └── slides.json            # ビルドされたスライド情報
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

1. **フロントエンド部分（src/）**:
   - Reactアプリケーション
   - Tailwind CSSでスタイリング

2. **スライド（src/slides/）**:
   - マークダウン形式のスライドファイル
   - YYYYMMDDの日付とハイフン、タイトルの形式でファイル名が構成されている

3. **ビルドシステム（scripts/）**:
   - マークダウンのスライドをHTMLとPDFに変換
   - スライド情報をJSONファイルとして生成
