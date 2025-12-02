import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        // domains: ["shopping-phinf.pstatic.net"] // 강의에서는 이거임 next 13.3부터는 remotePatterns 사용 권장
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shopping-phinf.pstatic.net',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
