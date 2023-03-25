/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_SITE_URL
  }
}

module.exports = nextConfig
