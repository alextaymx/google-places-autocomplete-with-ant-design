/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://google-places-autocomplete-with-ant-design.vercel.app', // FIXME: Change to the production URL
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
