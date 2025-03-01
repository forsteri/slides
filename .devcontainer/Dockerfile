FROM node:20

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*

# Marpに必要な環境変数の設定
ENV CHROME_PATH=/usr/bin/chromium
ENV CHROME_ARGS=--no-sandbox

# 作業ディレクトリの設定
WORKDIR /workspace