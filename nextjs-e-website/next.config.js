/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  serverExternalPackages: ['firebase-admin', 'stripe'],
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_SITE_URL
  }
}

module.exports = nextConfig
