import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}", // pages 사용 시만
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
