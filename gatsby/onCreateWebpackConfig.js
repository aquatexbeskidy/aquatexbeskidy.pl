// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    const regex = [/node_modules\/leaflet/, /node_modules\\leaflet/];

    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: regex,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~components': path.resolve(__dirname, '../src/components'),
        '~containers': path.resolve(__dirname, '../src/containers'),
        '~theme': path.resolve(__dirname, '../src/theme'),
        '~hooks': path.resolve(__dirname, '../src/hooks'),
        '~utils': path.resolve(__dirname, '../src/utils'),
      },
    },
  });
};
