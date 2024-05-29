// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const gatsbyRemarkPlugins = [
  `gatsby-remark-relative-images`, // gatsby-remark-relative-images must go before gatsby-remark-images
  `gatsby-remark-images`,
  {
    resolve: `gatsby-remark-images`,
    options: {
      backgroundColor: `transparent`,
      linkImagesToOriginal: false,
    },
  },
  {
    resolve: 'gatsby-remark-normalize-paths',
    options: {
      pathFields: ['image'],
    },
  },
];

module.exports = {
  siteMetadata: {
    siteGithub: `https://github.com/nomads-codes/aquatexbeskidy.pl`,
    siteUrl: `https://aquatexbeskidy.pl`,
    siteTitle: `AQUA-TEX Beskidy`,
    googleId: `G-GF3EERM084`,
    fbPixelId: `1369004450132215`,
    cookies: {
      content: `Ta strona korzysta z plików cookies (Google Analitics i Facebook Pixel), aby świadczyć usługi na najwyższym poziomie. Czy zgadzasz się na pliki cookies? Więcej informacji na ten temat znajdziesz w`,
      browserName: `PrivacyPolicy`,
      btnAccText: `Zgoda`,
      btnDecText: `Odmawiam`,
      privacyLink: `Polityce prywatności`,
      expiresDays: 30,
    },
  },
  flags: {
    // EXPERIMENTAL
    // (Umbrella Issue (​https://gatsby.dev/parallel-sourcing-feedback​))
    // Run all source plugins at the same time instead of serially. For sites with multiple source plugins, this can speedup sourcing and transforming considerably.
    // PARALLEL_SOURCING: false,

    // (Umbrella Issue (​https://gatsby.dev/cache-clearing-feedback​))
    // Don't delete the downloaded files cache when changing gatsby-node.js & gatsby-config.js files.
    // PRESERVE_FILE_DOWNLOAD_CACHE: false,

    // (Umbrella Issue (​https://gatsby.dev/cache-clearing-feedback​))
    // Don't delete webpack's cache when changing gatsby-node.js & gatsby-config.js files.
    // PRESERVE_WEBPACK_CACHE: true,

    // (Umbrella Issue (​https://gatsby.dev/fast-refresh-feedback​))
    // Use React Fast Refresh instead of the legacy react-hot-loader for instantaneous feedback in your development server.
    // Recommended for versions of React >= 17.0.
    // FAST_REFRESH: true,

    // Enable all experiments aimed at improving develop server start time
    FAST_DEV: true,

    // (Umbrella Issue (​https://gatsby.dev/dev-ssr-feedback​))
    // Helps you detect SSR bugs and fix them without needing to do full builds.
    // Server Side Render (SSR) pages on full reloads during develop.
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: gatsbyRemarkPlugins,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown/globals`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown/navigations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown/novelties`,
        name: `novelties`,
      },
    },
    `gatsby-plugin-advanced-pages`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: gatsbyRemarkPlugins,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`montserrat\:300,400,500,600,700`],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        // include: `${__dirname}/src/assets/icons`,
        prettier: true,
        svgo: true,
        svgoConfig: {
          plugins: [{ removeViewBox: true }, { cleanupIDs: true }],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AQUA-TEX Beskidy`,
        short_name: `AQUA-TEX Beskidy`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: 'standalone',
        icon: `src/favicons/favicon-32x32.png`,
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
  ],
};
