const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getBaseConfiguration = require('./webpack.config');

const devRefreshJScTransformation = {
  react: {
    development: true,
    refresh: true,
  },
};

const publicPath = 'http://localhost:4000/';

const isServeMode = process.env.WEBPACK_ENV === 'serve';

const output = isServeMode
  ? {
    publicPath,
  }
  : {};

const plugins = isServeMode ? [new ReactRefreshWebpackPlugin()] : [];

module.exports = merge(getBaseConfiguration(devRefreshJScTransformation), {
  cache: true,
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    splitChunks: false,
  },
  devServer: {
    compress: true,
    hot: true,
    port: '4000',
  },
  output,
  plugins,
});
