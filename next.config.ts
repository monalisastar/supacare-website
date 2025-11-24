/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  // Core Next.js settings
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Modern features (ONLY serverActions valid)
  experimental: {
    serverActions: true,
  },

  // Custom headers (safe to keep)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '</images/supalogo.webp>; rel=preload; as=image',
              '</images/hero.webp>; rel=preload; as=image',
              '</images/cta-background.webp>; rel=preload; as=image',
              '</fonts/poppins.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
            ].join(', '),
          },
        ],
      },
    ];
  },

  cleanDistDir: true,
};

export default nextConfig;
