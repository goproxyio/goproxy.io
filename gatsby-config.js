module.exports = {
  siteMetadata: {
    siteUrl: 'https://goproxy.io',
    name: 'GOPROXY.IO',
    title: 'GOPROXY.IO',
    description: 'GOPROXY.IO',
    author: '@lodastack.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        // isTSX: true,
        // jsxPragma: 'jsx',
        // allExtensions: true
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-lodash',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe'
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'GOPROXY.IO',
        short_name: 'GOPROXY.IO',
        start_url: '/',
        background_color: '#f8f8f8',
        theme_color: '#03A9F4',
        display: 'minimal-ui',
        icon: 'src/images/logo_512x512.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    //
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: [
          '**/*',
          '/docs/**/*'
        ]
      }
    }
  ]
}
