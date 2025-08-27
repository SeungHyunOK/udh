import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Noto_Sans_KR: ['Noto Sans KR', 'sans-serif'],
        Pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
