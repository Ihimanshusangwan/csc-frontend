// vite.config.js
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { resolve } from 'path';

export default defineConfig({
  base: "/customer/",
  plugins: [
    {
      name: 'dotenv',
      config() {
        const env = dotenv.config({
          path: resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
        }).parsed;
        return {
          define: Object.keys(env || {}).reduce((prev, next) => {
            prev[`import.meta.env.${next}`] = JSON.stringify(env[next]);
            return prev;
          }, {}),
        };
      },
    },
  ],
});
