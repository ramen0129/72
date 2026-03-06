import './style.css';

/**
 * ベル再生用アプリケーションのメインロジック
 * 状態を持たないステートレス設計とし、DOMの属性から音源を動的に読み込む。
 */

document.addEventListener('DOMContentLoaded', () => {
  // すべてのベルボタンを取得
  const buttons = document.querySelectorAll('button[data-sound]');

  // 再生を管理するAudioオブジェクト（連打対策のため1つだけ保持して使い回すか、都度生成するか）
  // 複数クリック時に重複再生させる（連打）場合は都度生成、
  // 以前の音を止めて再生する場合は1つを管理。
  // 今回は「連打・和音」も許容するクリーンな都度生成としつつ、メモリリークを防ぐ。

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const soundFile = button.getAttribute('data-sound');
      if (!soundFile) return;

      // クリック時のフィードバックアニメーション付与
      button.classList.add('scale-95');
      setTimeout(() => button.classList.remove('scale-95'), 150);

      // 音声を再生
      playSound(soundFile);
    });
  });
});

/**
 * 指定されたファイル名の音声を再生する
 * @param {string} fileName assets/sounds/ 以下のファイル名
 */
function playSound(fileName) {
  try {
    // パスはviteのアセット解決のため、デプロイ先を考慮し相対パスかBaseURLに対応させる
    // publicディレクトリがないため、assets/sounds/ をそのまま指定
    const audio = new Audio(`./assets/sounds/${fileName}`);
    audio.play().catch(error => {
      console.warn(`Failed to play ${fileName}:`, error);
    });
  } catch (error) {
    console.error('Audio playback error:', error);
  }
}
