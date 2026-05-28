import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const defaultAllowedHosts = ['dolina-landing.sslip.io'];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const allowedHosts = [
    ...defaultAllowedHosts,
    ...(env.VITE_ALLOWED_HOSTS ?? '')
      .split(',')
      .map((host) => host.trim())
      .filter(Boolean)
  ];

  return {
    plugins: [react()],
    preview: {
      allowedHosts
    },
    test: {
      environment: 'jsdom',
      globals: true
    }
  };
});
