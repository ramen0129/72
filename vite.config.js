import { defineConfig } from 'vite';

export default defineConfig({
    // GitHub Pagesなどにデプロイする際、相対パスでアセットを解決させるための設定
    base: './',
    server: {
        port: 3000,
        open: false,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    }
});
