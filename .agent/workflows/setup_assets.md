---
name: Audio Asset Downloader
description: Failbell用の音源ファイルをLinuxコマンドラインを利用してローカルに取得・配置する。
---
# Instructions
1. プロジェクトルートに `assets/sounds/` ディレクトリを作成する (`mkdir -p assets/sounds`)。
2. 著作権フリーのベル音源（SoundJay, ElevenLabs等のフリー配布音源）のURLをユーザーに確認、または提供されたURLリストを使用する。
3. Linuxの `wget` または `curl` コマンドを使用して、指定された音源を `assets/sounds/` 内にダウンロードする。
4. アプリケーションのコード（JS/React）が、これらのローカルファイルへの相対パスを正しく参照するように設定する。
