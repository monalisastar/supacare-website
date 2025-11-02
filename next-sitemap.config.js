/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.supacaresolutions.com',
  generateRobotsTxt: true, // Generates both sitemap.xml and robots.txt
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/dashboard/*', '/admin/*'], // exclude private routes if needed

  // ✅ Force homepage inclusion (missing by default)
  additionalPaths: async (config) => [
    await config.transform(config, '/'), // This adds https://www.supacaresolutions.com/
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
