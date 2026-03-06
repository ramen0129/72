---
name: Auto-Push Workflow
description: GitHubへの自動連携（自動コミット＆プッシュ）、.gitignoreの自己スキャン、およびREADME.mdの自動更新を行うワークフロー。動作確認成功後に発火する。
---
# Instructions

1. **[Safety Scan]**: `.gitignore` の内容を読み込み、`node_modules`, `dist`, `.env`, OS固有のファイル（`.DS_Store`等）などの秘匿・不要ファイルが確実に除外設定されているかを自己スキャンし、問題があれば修正またはユーザーに警告する。
2. **[README Refactoring]**: 現在の開発進捗や直近の変更内容（機能追加、リファクタリング内容など）に合わせて、`README.md` を最新の状態に書き換える。
3. **[Git Initialization]**: 
   - `git rev-parse --is-inside-work-tree` を実行し、まだGitリポジトリではない場合は `git init` を実行する。
4. **[Remote Configuration]**:
   - `git remote -v` を確認する。
   - リモートが設定されていない場合は、ユーザーに送信先のリポジトリURLを尋ねるか、提供されているURLを用いて `git remote add origin <URL>` を設定する。
5. **[Auto Commit]**:
   - `git status` を確認する。変更があれば以下の順で実行する：
   - `git add .`
   - 今回のアクション内容に基づいた適切で具体的なコミットメッセージを生成し、`git commit -m "<メッセージ>"` を実行する。
6. **[Auto Push]**:
   - `git branch -M main` を実行してデフォルトブランチを `main` に設定。
7. **[Workflow Monitoring]**:
   - `curl -s https://api.github.com/repos/<username>/<repo>/actions/runs` などを利用して、最新のGitHub Actionsワークフローの実行ステータスを取得する。
   - `status: "completed", conclusion: "success"` (All checks have passed) になるまで一定間隔でポーリング監視を行う。
   - エラー (`conclusion: "failure"`) が発生した場合は即座にログを解析し、修正コミット・Pushを自動実行する。
   - ワークフローの成功を見届けるまでを「実装完了の定義 (Definition of Done)」とする。
