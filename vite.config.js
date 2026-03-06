import { defineConfig } from 'vite';

export default defineConfig({
    // GitHub Pagesなどにデプロイする際、ターゲットリポジトリ名に合わせる
    base: '/72/',
    server: {
        port: 3000,
        open: false,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    }
});
