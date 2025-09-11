/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript settings
  typescript: {
    ignoreBuildErrors: true, // Only ignore during build
  },

  // Image handling
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // Experimental features
  experimental: {
    serverActions: {}, // Must be an object, not boolean
  },

  // Optional: strict mode for React
  reactStrictMode: true,

  // Optional: compression for production
  compress: true,
};

export default nextConfig;
