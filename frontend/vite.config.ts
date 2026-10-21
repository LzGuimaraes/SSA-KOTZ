import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const port = Number(env.VITE_PORT || 5173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('VITE_PORT deve ser uma porta entre 1 e 65535.');
  }

  return {
    plugins: [vue(), tailwindcss()],
    server: { host: 'localhost', port, strictPort: true },
    preview: { host: 'localhost', port: 4173, strictPort: true },
  };
});
