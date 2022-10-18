const { merge } = require('webpack-merge');

const getBaseConfiguration = require('./webpack.config');

module.exports = merge(getBaseConfiguration(), {
  performance: {
    hints: 'error',
    maxAssetSize: 1250000,
    maxEntrypointSize: 1500000,
  },
});
