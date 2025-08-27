import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // GitHub Pages는 서버가 없으니 정적 내보내기
  output: 'export',

  // 리포 이름이 경로에 붙어요: https://seunghyunok.github.io/udh
  basePath: isProd ? '/udh' : '',
  assetPrefix: isProd ? '/udh/' : '',

  // next/image 정적 Export 호환
  images: {
    unoptimized: true,
  },

  // 새로고침 404 방지에 도움(정적 사이트에서 권장)
  trailingSlash: true,
};

export default nextConfig;
