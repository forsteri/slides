# CLAUDE.md

このファイルは、このリポジトリで作業する際のClaude Code (claude.ai/code) 向けのガイダンスを提供します。

## 応答スタイル

- 応答は全て日本語で行う。

## ガイドライン

- コミットメッセージは必ず日本語で書く。

## よく使用するコマンド

- `npm run dev` - React アプリの開発サーバーを起動
- `npm run build` - React アプリのプロダクションビルド
- `npm run preview` - プロダクションビルドをローカルでプレビュー
- `npm run build:slides` - Markdown スライドを Marp を使用して HTML/PDF に変換

## アーキテクチャ概要

このプロジェクトは Markdown スライド管理・公開アプリケーションです：

1. **スライド作成**: `src/slides/` 内の Markdown ファイル（`YYYYMMDD-title.md` 形式）
2. **処理パイプライン**: `scripts/build-slides.js` が Marp CLI を使用して Markdown を HTML/PDF に変換
3. **ステータス管理**: フロントマターで `status: draft` を指定することで下書きと公開済みを分離
4. **React フロントエンド**: スライドライブラリを表示し、ダウンロード・閲覧機能を提供するシンプルな React アプリ
5. **自動デプロイ**: GitHub Actions が main ブランチへの push 時に自動ビルド・GitHub Pages へデプロイ

### 主要コンポーネント

- `scripts/build-slides.js` - Markdown ファイルを読み込み、フロントマター（タイトル、日付、ステータス）を抽出し、Marp CLI を使用して HTML/PDF を生成するコアビルドロジック
- `src/components/SlideList.jsx` - `src/data/slides.json` からスライドライブラリをレンダリングするメイン UI コンポーネント
- `src/data/slides.json` - 公開済みスライド情報を含む生成されたメタデータファイル
- `src/data/drafts.json` - 下書きスライド用の生成されたメタデータファイル（gitignore 対象）

### ディレクトリ構成

- `src/slides/` - Marp フロントマターを含むソース Markdown ファイル
- `public/slides/` - 公開済みスライド用の生成された HTML/PDF
- `public/drafts/` - 下書きスライド用の生成された HTML/PDF（gitignore 対象）
- `src/data/` - 生成された JSON メタデータファイル

### ビルドプロセス

1. `src/slides/` から全ての `.md` ファイルを読み込み
2. フロントマターを解析してステータス（公開済み/下書き）を判定
3. Marp CLI を使用して HTML と PDF バージョンを生成
4. React アプリ用のメタデータ JSON ファイルを作成
5. 増分ビルドの実装（変更されたファイルのみ再ビルド）
6. 孤立した出力ファイルのクリーンアップ

Vite 設定では、カスタムプラグインによりプロダクションビルドから drafts ディレクトリを除外しています。
