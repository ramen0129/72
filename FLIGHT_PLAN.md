# ✈️ FLIGHT PLAN: Failbell Workshop App

## 1. プロジェクト概要 (Mission Overview)
「Failbell Workshop App」は、ワークショップ等で利用するためのシンプルでクリーンなベル音再生アプリケーションです。
ワークショップの進行を妨げないクリーンでミニマルなUIを提供し、ボタンのクリックでローカルのベル音源を再生します。

## 2. 技術スタック (Tech Stack)
* **フロントエンド**: HTML, Vanilla JavaScript, Vite (ビルドツール)
* **スタイリング**: Tailwind CSS (保守性が高く、クリーン・ミニマルなUIの迅速な構築が可能)
* **ホスティング**: GitHub Pages (静的ファイルのホスティング)
* **音源管理**: ローカルディレクトリ (`assets/sounds/`) への相対パス参照によるCORSエラーの回避

## 3. ディレクトリ構成 (Directory Structure)
```text
/
├── index.html
├── src/
│   ├── main.js        # アプリケーションロジック・音源再生処理
│   └── style.css      # Tailwindエントリーポイント
├── assets/
│   └── sounds/        # ダウンロードしたベル音源
├── package.json       # 依存関係定義
├── vite.config.js     # Vite設定（GitHub Pages用Base URL設定含む）
├── .gitignore         # Env等秘匿情報の除外用
├── MISSION_CHARTER.md # プロジェクト憲章
└── FLIGHT_PLAN.md     # 本書
```

## 4. 機能要件 (Functional Requirements)
1. **ベル再生機能**: 画面上の洗練されたボタンをクリックすると、ローカルに保存されたベル音が再生される。
2. **クリーン・ミニマルUI**: 白を基調とし、装飾を最小限に抑えた押しやすいボタンデザイン（微細なホバーアニメーションやシャドウを活用してPremium感を演出）。Div Soupを避け、Semantic HTML (`<header>`, `<main>`等) を使用する。
3. **ステートレス設計**: 状態を持たず、リロードすれば常に初期状態（基本の画面）に戻る設計。

## 5. デプロイ手順 (Deployment Strategy for GitHub Pages)
1. GitHubリポジトリへのソースコードのプッシュ。
2. Viteによるビルド (`npm run build`) を実行し、`dist` ディレクトリを生成。
3. 生成された `dist` ディレクトリの内容を `gh-pages` ブランチにプッシュし公開する手順。

## 🚨 ユーザーへの確認事項 (User Review Required)
1. **フレームワークの選定**: 今回は要件を満たす範囲で最もシンプルで軽量な **Vite + Vanilla JS + Tailwind CSS** を提案していますが、コンポーネント指向での拡張を見据えてReactでの実装をご希望でしょうか？
2. **音源の用意**: アセット（ベル音）について、特定のフリー音源のURLのご指定はありますか？（指定がなければ、こちらで著作権フリーの適当な音源URLをいくつか提案し、`setup_assets.md` フローに従って直接ダウンロードします）
