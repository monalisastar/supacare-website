/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'localhost'], // Keep your existing config
  },
  experimental: {
    serverActions: true, // Keep your existing config
  },
};

export default nextConfig;
