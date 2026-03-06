# 🔔 Failbell Workshop App

## 📝 概要 (Overview)
「Failbell Workshop App」は、ワークショップ等の進行時に利用するためのシンプルでクリーンなベル音再生デスクトップ・コンパニオンアプリです。

🌟 **[Live Demo (稼働中)](https://ramen0129.github.io/72/)**

ワークショップの雰囲気を壊さない洗練された「クリーン・ミニマル」なUIデザインを採用し、ブラウザ上で軽快に動作します。

## ✨ 機能 (Features)
- 3種類のベル音源（Service Bell, Hand Bell, Church Bell）の即時再生機能
- Tailwind CSSによる洗練されたモダンUIデザイン（Glassmorphism/Minimalismへの拡張を視野に設計）
- 状態を持たないステートレス設計（再読み込みで初期状態へリセット）
- CORSエラーを防ぐためのローカル音源相対参照

## 🛠 技術スタック (Tech Stack)
- **Frontend**: HTML5, Vanilla JavaScript
- **Styling**: Tailwind CSS, PostCSS
- **Build Tool**: Vite (Node.js 18+ 対応版 Vite v5)
- **Font**: Google Fonts (Inter)

## 🚀 開発の進捗 (Development Status)
- [x] プロジェクト憲章 (`MISSION_CHARTER.md`) の策定
- [x] `setup_assets.md` を用いたオープンソース音源のローカル取得
- [x] Vite + Vanilla JS + Tailwind 構成の初期化とビルドパス修正
- [x] フロントエンドの基本実装 (HTML/JS/CSS)
- [x] `auto_push.md` によるGitHub CIデプロイ用ワークフローの確立

## 📦 ローカルでの実行方法 (How to Run)
1. 依存関係のインストール:
   ```bash
   npm install
   ```
2. 開発サーバーの起動:
   ```bash
   npm run dev
   ```
3. プロダクションビルド:
   ```bash
   npm run build
   ```

## 🔐 セキュリティ・ポリシー (Security Policy)
- `.env` やシステム固有ファイル (`.DS_Store`等)、依存モジュール (`node_modules`) は `.gitignore` によって厳密に監視・除外されています。

> *Generated and maintained by Space Brothers Mission Control (AntiGravity Agent)*
