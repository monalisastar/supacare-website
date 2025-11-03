/** @type {import('next').NextConfig} */
const nextConfig = {
  // :white_check_mark: TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },

  // :white_check_mark: Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // optional CDN source
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },

  // :white_check_mark: Core Performance
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // :white_check_mark: Modern JavaScript output
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    serverActions: {},
  },

  // :white_check_mark: Custom Headers (Caching + Preload + Security)
  async headers() {
    return [
      // :one: Global caching + security headers
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

      // :two: Preload critical Supacare assets (improves LCP)
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

  // :white_check_mark: Clean build folder each time
  cleanDistDir: true,
};

export default nextConfig;