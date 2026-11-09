/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/pricing', destination: '/', permanent: true },
      { source: '/resources', destination: '/', permanent: true },
      { source: '/resources/:slug', destination: '/', permanent: true },
    ]
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@modelcontextprotocol/server',
      '@modelcontextprotocol/core',
      'mcp-handler',
      'nodemailer',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
