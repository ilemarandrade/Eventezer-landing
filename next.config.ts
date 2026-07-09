import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Cloudflare no soporta el Image Optimization de Next en export estático
  },
};

export default nextConfig;
