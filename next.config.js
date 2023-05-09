/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
      largePageDataBytes: 128 * 100000,
  },
  images: {
    domains: ['ddragon.leagueoflegends.com'],
  },
}

module.exports = nextConfig
