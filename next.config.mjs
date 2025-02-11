import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media2.dev.to'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    optimizePackageImports: ['nodemon', 'ts-node', 'winston-daily-rotate-file']
  }
};

export default withNextIntl(nextConfig);
