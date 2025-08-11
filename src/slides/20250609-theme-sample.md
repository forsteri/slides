---
marp: true
theme: main-theme-with-header
title: テーマサンプル
date: 2025/06/09
status: draft
header: 'テーマカスタマイズサンプル'
paginate: true
---

<!-- _class: lead -->

# テーマカスタマイズサンプル

Marpテーマのデザイン確認用スライド

---

## 見出しのテスト

### H1からH6まで

# 見出し1（H1）
## 見出し2（H2）
### 見出し3（H3）
#### 見出し4（H4）
##### 見出し5（H5）
###### 見出し6（H6）

---

## テキストスタイルのテスト

通常のテキストです。**太字のテキスト**、*斜体のテキスト*、~~取り消し線のテキスト~~があります。

- 箇条書きのアイテム1
- 箇条書きのアイテム2
  - ネストした箇条書き
  - もう一つのネストアイテム
- 箇条書きのアイテム3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3

---

## コードブロックのテスト

インラインコード: `const hello = "world"`

```javascript
// JavaScriptのコードブロック
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

```typescript
// TypeScriptのコードブロック
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "太郎",
  age: 30
};
```

---

## テーブルのテスト

| 項目 | 説明 | 価格 |
|------|------|------|
| 商品A | 高品質な商品 | ¥1,000 |
| 商品B | 使いやすい商品 | ¥2,000 |
| 商品C | 人気の商品 | ¥3,000 |

---

## 引用とコールアウト

> これは引用文です。
> 複数行にわたる引用も可能です。

**重要なポイント:**
- ポイント1
- ポイント2
- ポイント3

**注意事項:**
⚠️ 注意が必要な内容です。

---

## カラーテスト

<span style="color: #0066cc;">青色のテキスト</span>
<span style="color: #ff6600;">オレンジ色のテキスト</span>
<span style="color: #009900;">緑色のテキスト</span>
<span style="color: #cc0000;">赤色のテキスト</span>

背景色のテスト:
<span style="background-color: #ffffcc; padding: 4px;">ハイライト背景</span>

---

## レイアウトテスト（2カラム）

<div style="display: flex; gap: 20px;">

<div style="flex: 1;">

### 左カラム
- 項目1
- 項目2
- 項目3

</div>

<div style="flex: 1;">

### 右カラム
- 項目A
- 項目B
- 項目C

</div>

</div>

---

## アイコンと装飾のテスト

✅ チェックマーク
❌ バツマーク
⚠️ 警告
📝 メモ
🚀 ロケット
💡 アイデア

---

## 長いコンテンツのテスト

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

---

<!-- _class: lead -->

# テーマテスト完了

このスライドでテーマの調整を行いましょう