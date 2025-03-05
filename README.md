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
