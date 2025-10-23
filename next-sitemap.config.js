/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.supacaresolutions.com',
  generateRobotsTxt: true, // Generates both sitemap.xml and robots.txt
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/dashboard/*', '/admin/*'], // exclude any private routes if needed
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
